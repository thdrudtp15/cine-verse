async function embed() {
    try {
        const res = await fetch('http://localhost:3000/api/imbed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error('Error embedding movies:', error);
    }
}

embed();
