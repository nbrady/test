import { useState } from 'react';
import { CardImage } from './card-image.component';

export const CreateCardForm = () => {

    const [cardName, setCardName] = useState<string>("");
    const [cardCost, setCardCost] = useState<number>(0);
    const [cardPower, setCardPower] = useState<number>(0);
    const [cardCombo, setCardCombo] = useState<number>(0);
    const [cardEffect, setCardEffect] = useState<string>("");
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
                        <input id='card-cost' type="number" min={0} value={cardCost} onChange={(event) => setCardCost(Number(event.target.value))} />
                    </div>

                    <div>
                        <label htmlFor='card-power'>Card Power: </label>
                        <input id='card-power' type="number" min={0} value={cardPower} onChange={(event) => setCardPower(Number(event.target.value))} />
                    </div>

                    <div>
                        <label htmlFor='card-combo'>Card Combo: </label>
                        <input id='card-combo' type="number" min={0} value={cardCombo} onChange={(event) => setCardCombo(Number(event.target.value))} />
                    </div>

                    <div>
                        <label htmlFor='card-effect'>Effect: </label>
                        <input id='card-effect' type="text" min={0} value={cardEffect} onChange={(event) => setCardEffect(event.target.value)} />
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
                        cardCombo={cardCombo}
                        cardEffect={cardEffect}
                        cardImage={cardImage}
                    />
                </div>
            </div>
        </div>
    );
}