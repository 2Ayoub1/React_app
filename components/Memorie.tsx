'use client';
import './CSS/Memorie.css';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Card from '@/components/Card';
import apllo_img from './assets/apollo.png';
import internet_img from './assets/internet.png';
import moon_img from './assets/moon.png';
import mountain_img from './assets/mountain.png';
import premium_img from './assets/premium.png';
import trees_img from './assets/trees.png';
import sword_img from './assets/sword_17401961.png';
import rifle_img from './assets/rifle_7165191.png';

interface Item {
    id: number;
    img: string;
    isActive: boolean;
    isMatched: boolean;
}

function Memories() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [lock, setLock] = useState(false);
    const [moves, setMoves] = useState(0);
    const [firstCardID, setFirstCardID] = useState<number | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null)
    const [now , setNow] = useState<number | null>(null);
    const moveRef = useRef<HTMLSpanElement>(null);
    const intervallRef = useRef<NodeJS.Timeout | null>(null);
    const [buttonText, setButtonText] = useState<string>("Start Game");
    let [buttonCount, setButtonCount] = useState(0);

    useEffect(() => {
        const shuffledItems = [
            { id: 1, img: apllo_img.src, isActive: false, isMatched: false },
            { id: -1, img: apllo_img.src, isActive: false, isMatched: false },
            { id: 2, img: internet_img.src, isActive: false, isMatched: false },
            { id: -2, img: internet_img.src, isActive: false, isMatched: false },
            { id: 3, img: moon_img.src, isActive: false, isMatched: false },
            { id: -3, img: moon_img.src, isActive: false, isMatched: false },
            { id: 4, img: mountain_img.src, isActive: false, isMatched: false },
            { id: -4, img: mountain_img.src, isActive: false, isMatched: false },
            { id: 5, img: premium_img.src, isActive: false, isMatched: false },
            { id: -5, img: premium_img.src, isActive: false, isMatched: false },
            { id: 6, img: trees_img.src, isActive: false, isMatched: false },
            { id: -6, img: trees_img.src, isActive: false, isMatched: false },
            { id: 7, img: sword_img.src, isActive: false, isMatched: false },
            { id: -7, img: sword_img.src, isActive: false, isMatched: false },
            { id: 8, img: rifle_img.src, isActive: false, isMatched: false },
            { id: -8, img: rifle_img.src, isActive: false, isMatched: false }
        ].sort(() => Math.random() - 0.5);

        setItems(shuffledItems);
    }, []);

    function startClock() {
        setStartTime(Date.now);
        setNow(Date.now);

        if (intervallRef.current) {
            clearInterval(intervallRef.current)
        }

        intervallRef.current = setInterval(() => {
            setNow(Date.now());
        }, 10)

    }

    function stopClock() {
        if (intervallRef.current) {
            clearInterval(intervallRef.current);
        }
    }

    function startGame() {

        if (buttonCount%2 === 0) {
            setButtonText("Stop Game");
            setIsGameStarted(true);
            startClock();
            setMoves(0);

            setItems(items.map(item => {
                return {...item, isActive:false, isMatched:false};
            }))
        } else {
            setButtonText("Start Game");
            setIsGameStarted(false);
            stopClock();
        }
        setButtonCount(++buttonCount);

    }

    function handleClick(id: number) {
        if (!isGameStarted) {
            return
        }

        if (lock) {
            return;
        }
    
        const updatedItems = items.map(item => {
            if (item.id === id && !item.isActive && !item.isMatched) {
                return { ...item, isActive: true };
            }
            return item;
        });
    
        setItems(updatedItems);
    
        const activeCards = updatedItems.filter(item => item.isActive && !item.isMatched);
    
        if (activeCards.length === 1) {
            setFirstCardID(id);
        } else if (activeCards.length === 2) {
            setLock(true);
            setMoves(prevMoves => prevMoves + 1);
            setTimeout(() => {
                const [firstCard, secondCard] = activeCards;
                if (Math.abs(firstCard.id) === Math.abs(secondCard.id)) {
                    setItems(items.map(item =>
                        Math.abs(item.id) === Math.abs(firstCard.id)
                            ? { ...item, isMatched: true, isActive: false }
                            : item
                    ));
                } else {

                    setItems(items.map(item =>
                        item.isActive ? { ...item, isActive: false } : item
                    ));
                }
                setLock(false);
            }, 500);
        }
    }
    

    useEffect(() => {
        if (moveRef.current) {
            moveRef.current.innerHTML = ` ${moves}`;
        }

        if (!startGame) {
            items.map(item => {
                return {...item, isMatched: false, isActive: false}
            })
        }
    }, [moves]);

    let secondPassed = 0;
  
    if (startTime !== null && now !== null) {
        secondPassed = (now - startTime) /1000;
    }

    return (
        <section className='section'>
            <div className="container">
                <div className="text">
                    <p>Moves: <span className='Move' ref={moveRef} >0</span></p>
                    <p>Time: <span className='clock' >{secondPassed.toFixed(0)}</span></p>
                </div>
                <div className="gameBoard">
                    {items.map((item, index) => (
                        <Card
                            key={index}
                            item={item}
                            isActive={item.isActive}
                            isMatched={item.isMatched}
                            onToogle={() => handleClick(item.id)}
                        />
                    ))}
                </div>

                <div>
                    <button className='button' onClick={startGame}>{buttonText}</button>
                </div>
            </div>
        </section>
    );
}

export default Memories;