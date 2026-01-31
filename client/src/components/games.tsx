import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Grid3X3, RotateCcw, Puzzle } from "lucide-react";

// --- Tic Tac Toe ---
function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : board.every(s => s) ? "Draw!" : `Next: ${xIsNext ? "X" : "O"}`;

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const next = [...board];
    next[i] = xIsNext ? "X" : "O";
    setBoard(next);
    setXIsNext(!xIsNext);
  };

  return (
    <div className="space-y-4">
      <div className="text-lg font-bold text-center">{status}</div>
      <div className="grid grid-cols-3 gap-2 w-48 mx-auto">
        {board.map((s, i) => (
          <Button
            key={i}
            variant="outline"
            className="h-14 w-14 text-xl font-bold"
            onClick={() => handleClick(i)}
            data-testid={`tic-tac-toe-cell-${i}`}
          >
            {s}
          </Button>
        ))}
      </div>
      <Button variant="ghost" className="w-full" onClick={() => setBoard(Array(9).fill(null))}>
        <RotateCcw className="mr-2 h-4 w-4" /> Reset
      </Button>
    </div>
  );
}

// --- Memory Game ---
const EMOJIS = ["🎮", "🕹️", "🎯", "🎲", "🧩", "👾", "🤖", "🚀"];

function MemoryGame() {
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initGame = () => {
    const deck = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
    setCards(deck);
    setFlipped([]);
    setMoves(0);
  };

  useEffect(initGame, []);

  const handleFlip = (id: number) => {
    if (flipped.length === 2 || cards[id].flipped || cards[id].matched) return;
    
    const nextCards = [...cards];
    nextCards[id].flipped = true;
    setCards(nextCards);
    
    const nextFlipped = [...flipped, id];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = nextFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        nextCards[first].matched = true;
        nextCards[second].matched = true;
        setCards(nextCards);
        setFlipped([]);
      } else {
        setTimeout(() => {
          nextCards[first].flipped = false;
          nextCards[second].flipped = false;
          setCards(nextCards);
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center font-bold">Moves: {moves}</div>
      <div className="grid grid-cols-4 gap-2 w-64 mx-auto">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className={`h-14 w-14 flex items-center justify-center text-2xl border rounded-md cursor-pointer transition-all duration-300 ${
              card.flipped || card.matched ? "bg-accent rotate-0" : "bg-primary/10 rotate-y-180"
            }`}
          >
            {(card.flipped || card.matched) ? card.emoji : "?"}
          </div>
        ))}
      </div>
      <Button variant="ghost" className="w-full" onClick={initGame}>
        <RotateCcw className="mr-2 h-4 w-4" /> Reset
      </Button>
    </div>
  );
}

export function Games() {
  const [activeGame, setActiveGame] = useState<"ttt" | "memory">("ttt");

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Puzzle className="h-5 w-5" /> Mini Games
        </CardTitle>
        <div className="flex gap-1">
          <Button 
            size="sm" 
            variant={activeGame === "ttt" ? "default" : "outline"}
            onClick={() => setActiveGame("ttt")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant={activeGame === "memory" ? "default" : "outline"}
            onClick={() => setActiveGame("memory")}
          >
            <Puzzle className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {activeGame === "ttt" ? <TicTacToe /> : <MemoryGame />}
      </CardContent>
    </Card>
  );
}
