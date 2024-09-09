import React, { useState, useEffect } from 'react';

const UpgradeTap = ({ telegramId }) => {
    const [coins, setCoins] = useState(0);
    const [tapLevel, setTapLevel] = useState(1);
    const [tapSize, setTapSize] = useState(1);
    const [upgradeCost, setUpgradeCost] = useState(2);

    useEffect(() => {
        // Fetch user data from the server (pseudo-code)
        fetchUserData(telegramId).then((data) => {
            setCoins(data.coins);
            setTapLevel(data.tapLevel);
            setTapSize(data.tapSize);
            setUpgradeCost(calculateUpgradeCost(data.tapLevel));
        });
    }, [telegramId]);

    const calculateUpgradeCost = (level) => {
        return Math.pow(2, level);
    };

    const handleUpgrade = async () => {
        try {
            const response = await fetch('/upgrade-tap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ telegramId }),
            });
            const data = await response.json();

            if (response.ok) {
                setCoins(data.remainingCoins);
                setTapLevel(data.newTapLevel);
                setTapSize(data.newTapSize);
                setUpgradeCost(calculateUpgradeCost(data.newTapLevel));
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Upgrade failed', error);
        }
    };

    return (
        <div className="upgrade-container">
            <h2>Tap Upgrade</h2>
            <p>Current Tap Size: {tapSize}</p>
            <p>Current Level: {tapLevel}</p>
            <p>Coins: {coins}</p>
            <p>Upgrade Cost: {upgradeCost} Coins</p>
            <button onClick={handleUpgrade} disabled={coins < upgradeCost}>
                Upgrade Tap Size
            </button>
        </div>
    );
};

export default UpgradeTap;
