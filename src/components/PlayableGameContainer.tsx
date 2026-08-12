import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Play, RotateCcw, Volume2, VolumeX, Maximize2, Trophy, Zap, Shield, ChevronLeft } from 'lucide-react';
import { PlayableType } from '../types';

interface Props {
  playableType: PlayableType;
  gameTitle: string;
  onClose?: () => void;
}

export const PlayableGameContainer: React.FC<Props> = ({ playableType, gameTitle, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem(`high_score_${playableType}`) || '0', 10);
  });
  const [gameOver, setGameOver] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Game Engine State Refs
  const gameStateRef = useRef({
    playerX: 150,
    playerY: 320,
    speed: 5,
    boost: 100,
    enemies: [] as Array<{ x: number; y: number; speed: number; type: number; width: number; height: number }>,
    particles: [] as Array<{ x: number; y: number; vx: number; vy: number; life: number; color: string }>,
    score: 0,
    keys: { left: false, right: false, up: false, down: false, space: false },
    animationFrameId: 0,
  });

  const startCanvasGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    gameStateRef.current.score = 0;
    gameStateRef.current.playerX = 150;
    gameStateRef.current.boost = 100;
    gameStateRef.current.enemies = [];
    gameStateRef.current.particles = [];
  };

  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameCount = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) gameStateRef.current.keys.left = true;
      if (['ArrowRight', 'KeyD'].includes(e.code)) gameStateRef.current.keys.right = true;
      if (['ArrowUp', 'KeyW'].includes(e.code)) gameStateRef.current.keys.up = true;
      if (['ArrowDown', 'KeyS'].includes(e.code)) gameStateRef.current.keys.down = true;
      if (['Space'].includes(e.code)) gameStateRef.current.keys.space = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) gameStateRef.current.keys.left = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) gameStateRef.current.keys.right = false;
      if (['ArrowUp', 'KeyW'].includes(e.code)) gameStateRef.current.keys.up = false;
      if (['ArrowDown', 'KeyS'].includes(e.code)) gameStateRef.current.keys.down = false;
      if (['Space'].includes(e.code)) gameStateRef.current.keys.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const gameLoop = () => {
      frameCount++;
      const state = gameStateRef.current;
      const width = canvas.width;
      const height = canvas.height;

      // CLEAR CANVAS
      ctx.fillStyle = '#0a0a10';
      ctx.fillRect(0, 0, width, height);

      // RACER MINIGAME PHYSICS
      if (playableType === 'racer') {
        // Draw Highway Grid Lines
        ctx.strokeStyle = '#1e1b4b';
        ctx.lineWidth = 2;
        const gridOffset = (frameCount * (state.keys.space ? 12 : 6)) % 40;
        for (let y = gridOffset; y < height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Road Boundaries
        ctx.fillStyle = '#111827';
        ctx.fillRect(40, 0, width - 80, height);
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 4;
        ctx.strokeRect(40, -10, width - 80, height + 20);

        // Center Lanes
        ctx.setLineDash([20, 20]);
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Player movement
        const isBoosting = state.keys.space && state.boost > 5;
        const currentSpeed = isBoosting ? 9 : 5;

        if (isBoosting) {
          state.boost = Math.max(0, state.boost - 0.4);
        } else {
          state.boost = Math.min(100, state.boost + 0.1);
        }

        if (state.keys.left) state.playerX = Math.max(50, state.playerX - 6);
        if (state.keys.right) state.playerX = Math.min(width - 80, state.playerX + 6);

        // Spawn traffic cars
        if (frameCount % Math.max(25, 60 - Math.floor(state.score / 50)) === 0) {
          const laneX = Math.random() > 0.5 ? 70 : width - 110;
          state.enemies.push({
            x: laneX,
            y: -60,
            speed: Math.random() * 2 + currentSpeed,
            type: Math.floor(Math.random() * 3),
            width: 32,
            height: 52,
          });
        }

        // Update & draw traffic cars
        for (let i = state.enemies.length - 1; i >= 0; i--) {
          const e = state.enemies[i];
          e.y += e.speed;

          // Draw Enemy Vehicle
          ctx.fillStyle = e.type === 0 ? '#ef4444' : e.type === 1 ? '#eab308' : '#ec4899';
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 10;
          ctx.fillRect(e.x, e.y, e.width, e.height);
          ctx.shadowBlur = 0;

          // Collision Check
          if (
            state.playerX < e.x + e.width &&
            state.playerX + 32 > e.x &&
            state.playerY < e.y + e.height &&
            state.playerY + 52 > e.y
          ) {
            // Collision Crash!
            setGameOver(true);
            setIsPlaying(false);
            if (state.score > highScore) {
              setHighScore(state.score);
              localStorage.setItem(`high_score_${playableType}`, state.score.toString());
            }
            return;
          }

          if (e.y > height + 100) {
            state.enemies.splice(i, 1);
            state.score += 10;
            setScore(state.score);
          }
        }

        // Draw Player Cyber Car
        ctx.fillStyle = '#06b6d4';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = isBoosting ? 25 : 12;
        ctx.fillRect(state.playerX, state.playerY, 32, 52);
        // Headlights
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(state.playerX + 4, state.playerY, 6, 8);
        ctx.fillRect(state.playerX + 22, state.playerY, 6, 8);
        // Exhaust flames if boosting
        if (isBoosting) {
          ctx.fillStyle = '#f97316';
          ctx.fillRect(state.playerX + 10, state.playerY + 52, 12, 15);
        }
        ctx.shadowBlur = 0;
      } else {
        // NAIROBI CYBERPUNK TARGET RUNNER
        // Draw Cyberpunk City Skyline background
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(0, height - 100, width, 100);

        // Neon Skyscrapers
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(20, 50, 60, height - 150);
        ctx.fillRect(100, 30, 80, height - 130);
        ctx.fillRect(210, 80, 70, height - 180);

        // Target Spawns
        if (frameCount % 45 === 0) {
          state.enemies.push({
            x: Math.random() * (width - 60) + 30,
            y: Math.random() * (height - 200) + 40,
            speed: 0,
            type: 1,
            width: 35,
            height: 35,
          });
        }

        // Draw Targets
        for (let i = state.enemies.length - 1; i >= 0; i--) {
          const t = state.enemies[i];
          ctx.strokeStyle = '#f43f5e';
          ctx.lineWidth = 3;
          ctx.shadowColor = '#f43f5e';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(t.x, t.y, 18, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(t.x, t.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.fill();

          t.speed += 0.05; // lifespan counter
          if (t.speed > 3) {
            state.enemies.splice(i, 1);
          }
        }

        // Auto Score Incrementor
        if (frameCount % 10 === 0) {
          state.score += 2;
          setScore(state.score);
        }
      }

      state.animationFrameId = requestAnimationFrame(gameLoop);
    };

    gameStateRef.current.animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(gameStateRef.current.animationFrameId);
    };
  }, [isPlaying, playableType, highScore]);

  // Touch/Click Handler for Cyberpunk Target Shooter
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const state = gameStateRef.current;
    if (playableType === 'racer') {
      // Touch steer
      if (clickX < canvas.width / 2) {
        state.playerX = Math.max(50, state.playerX - 25);
      } else {
        state.playerX = Math.min(canvas.width - 80, state.playerX + 25);
      }
    } else {
      // Shoot target
      for (let i = state.enemies.length - 1; i >= 0; i--) {
        const t = state.enemies[i];
        const dist = Math.hypot(clickX - t.x, clickY - t.y);
        if (dist <= 25) {
          state.enemies.splice(i, 1);
          state.score += 50;
          setScore(state.score);
          if (state.score > highScore) {
            setHighScore(state.score);
            localStorage.setItem(`high_score_${playableType}`, state.score.toString());
          }
        }
      }
    }
  };

  return (
    <div className="bg-neutral-950 border border-cyan-500/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.25)] my-6">
      {/* HEADER */}
      <div className="bg-neutral-900 px-4 py-3 border-b border-neutral-800 flex items-center justify-between font-mono">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
          <Gamepad2 className="w-5 h-5 text-cyan-400" />
          <span>PLAY IN BROWSER: {gameTitle}</span>
        </div>
        <div className="flex items-center space-x-4 text-xs text-neutral-300">
          <div className="flex items-center space-x-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>BEST: <strong className="text-yellow-400">{highScore}</strong></span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white flex items-center space-x-1 px-2 py-1 bg-neutral-800 rounded"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}
        </div>
      </div>

      {/* GAME CANVAS AREA */}
      <div className="relative flex justify-center bg-black p-2 min-h-[360px]">
        <canvas
          ref={canvasRef}
          width={320}
          height={380}
          onClick={handleCanvasClick}
          className="bg-neutral-950 rounded-lg border border-neutral-800 cursor-pointer shadow-inner touch-none"
        />

        {/* PRE-START SCREEN */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-neutral-950/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-mono text-white">{gameTitle}</h3>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                {playableType === 'racer'
                  ? 'Use Arrow Keys / A-D to steer, Spacebar to boost!'
                  : 'Click or tap on the glowing cyber targets before they disappear!'}
              </p>
            </div>
            <button
              onClick={startCanvasGame}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-mono font-bold text-sm tracking-wider flex items-center space-x-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>START PLAYING</span>
            </button>
          </div>
        )}

        {/* GAME OVER OVERLAY */}
        {gameOver && (
          <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="text-red-500 font-mono font-extrabold text-2xl tracking-widest animate-pulse">
              GAME OVER
            </div>
            <div className="text-white font-mono text-lg">
              SCORE: <span className="text-cyan-400 font-bold">{score}</span>
            </div>
            <button
              onClick={startCanvasGame}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-sm flex items-center space-x-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
              <span>RETRY GAME</span>
            </button>
          </div>
        )}
      </div>

      {/* FOOTER CONTROLS / TOUCH STEERING */}
      {isPlaying && playableType === 'racer' && (
        <div className="bg-neutral-900 p-3 border-t border-neutral-800 flex items-center justify-between font-mono text-xs text-neutral-400">
          <div className="flex space-x-2">
            <button
              onClick={() => (gameStateRef.current.playerX = Math.max(50, gameStateRef.current.playerX - 25))}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 active:bg-cyan-900 rounded-lg text-cyan-400 font-bold border border-cyan-800"
            >
              ◀ LEFT
            </button>
            <button
              onClick={() => (gameStateRef.current.playerX = Math.min(240, gameStateRef.current.playerX + 25))}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 active:bg-cyan-900 rounded-lg text-cyan-400 font-bold border border-cyan-800"
            >
              RIGHT ▶
            </button>
          </div>
          <button
            onClick={() => (gameStateRef.current.keys.space = true)}
            onMouseUp={() => (gameStateRef.current.keys.space = false)}
            onTouchStart={() => (gameStateRef.current.keys.space = true)}
            onTouchEnd={() => (gameStateRef.current.keys.space = false)}
            className="px-4 py-2 bg-purple-900/80 hover:bg-purple-800 rounded-lg text-purple-200 font-bold border border-purple-600 flex items-center space-x-1"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>BOOST</span>
          </button>
        </div>
      )}
    </div>
  );
};
