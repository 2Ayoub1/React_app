import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface CardProps {
    item: {
        id: number;
        img: string;
    };
    onToogle: () => void;
    isActive: boolean;
    isMatched: boolean;
}

const Card: React.FC<CardProps> = ({ item, onToogle, isActive, isMatched}) => {
    return (
        <div className={`card ${isMatched? 'isMatched': ''}  ${isActive? 'active': ''}`} onClick={onToogle}>
            <div className='card-inner'>
                <div className="card-front">
                    <Image 
                        src={item.img} 
                        alt="card" 
                        width={100}
                        height={100}
                    />
                </div>
                <div className="card-back"></div>
            </div>
        </div>
    );
};

export default Card;