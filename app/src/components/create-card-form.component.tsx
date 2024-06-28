import { useState } from 'react';
import { CardImage } from './card-image.component';

export const CreateCardForm = () => {

    const [cardName, setCardName] = useState<string>();
    const [cardCost, setCardCost] = useState<number>();
    const [cardPower, setCardPower] = useState<number>();
    const [cardHealth, setCardHealth] = useState<number>();
    const [cardEffect, setCardEffect] = useState<string>();
    const [cardImage, setCardImage] = useState<string>();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            setCardImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-8'>
                    <div>
                        <label htmlFor='card-name'>Card Name: </label>
                        <input id='card-name' type="text" value={cardName} onChange={(event) => setCardName(event.target.value)} />
                    </div>

                    <div>
                        <label htmlFor='card-cost'>Card Cost: </label>
                        <input id='card-cost' type="text" value={cardCost} onChange={(event) => setCardCost(Number(event.target.value))} />
                    </div>

                    <div>
                        <label htmlFor='card-power'>Card Power: </label>
                        <input id='card-power' type="text" value={cardPower} onChange={(event) => setCardPower(Number(event.target.value))} />
                    </div>

                    <div>
                        <label htmlFor='card-combo'>Card Health: </label>
                        <input id='card-combo' type="text" value={cardHealth} onChange={(event) => setCardHealth(Number(event.target.value))} />
                    </div>

                    <div>
                        <label htmlFor='card-effect'>Effect: </label>
                        <input id='card-effect' type="text" value={cardEffect} onChange={(event) => setCardEffect(event.target.value)} />
                    </div>

                    <div>
                        <label htmlFor='card-image'>Card Image: </label>
                        <input id='card-image' type="file" onChange={handleChange} />
                    </div>
                </div>

                <div className="col-4">
                    <label htmlFor='card-preview'>Card Preview: </label>
                    <CardImage
                        cardName={cardName}
                        cardCost={cardCost}
                        cardPower={cardPower}
                        cardHealth={cardHealth}
                        cardEffect={cardEffect}
                        cardImage={cardImage}
                    />
                </div>
            </div>
        </div>
    );
}