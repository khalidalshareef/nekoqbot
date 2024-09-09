// Check-in function
function checkIn() {
    const lastCheckIn = localStorage.getItem('lastCheckIn');
    const now = new Date();

    if (!lastCheckIn || new Date(lastCheckIn).getDate() !== now.getDate()) {
        // Update last check-in date
        localStorage.setItem('lastCheckIn', now);

        // Update token balance
        let balance = parseInt(localStorage.getItem('balance') || '0', 10);
        balance += 10; // Increment by 10 tokens (or any value you prefer)
        localStorage.setItem('balance', balance);
        
        // Update UI
        document.getElementById('balance').innerText = balance;
        document.getElementById('message').innerText = "You've earned 10 tokens for today!";
    } else {
        // If already checked in today
        document.getElementById('message').innerText = "You've already checked in today. Come back tomorrow!";
    }
}

// Initialize app
function init() {
    const balance = localStorage.getItem('balance') || '0';
    document.getElementById('balance').innerText = balance;
}

window.onload = init;
