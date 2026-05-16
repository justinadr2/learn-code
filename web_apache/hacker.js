async function createHackerPHP() {
    const input = document.getElementById('input-hacker');
    const name = input.value;
    const status = document.getElementById('status');

    if (!name) {
        status.innerText = "Enter a name";
        return;
    }

    try { 
        const response = await fetch('PHP/create-hacker.php?v=1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const result = await response.text();
        status.innerText = result;
        input.value = '';        
        getHackersNode();
    } catch (error) {
        status.innerText = "PHP connection failed";
    }
}

async function createHackerNode() {
    const input = document.getElementById('input-hacker');
    const name = input.value;
    const status = document.getElementById('status');
    
    if (!name) {
        status.innerText = "Enter a name";
        return;
    }

    try {
        const response = await fetch('https://127.0.0.1:3000/create-hacker', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name })
        });
        const result = await response.text();
        status.innerText = result;
        input.value = '';
        getHackersNode();
    } catch (error) {
        status.innerText = "Node connection failed";
    }
}

async function getHackersNode() {
    const list = document.getElementById('list-hackers');

    try {
        const response = await fetch('https://127.0.0.1:3000/get-hackers');
        const data = await response.json();
        list.innerHTML = "";

        if (data.length === 0) {
            list.innerHTML = "<p> Hackers list is empty </p>";
            return;
        }

        data.forEach(hacker => {
            const item = document.createElement('div');
            item.className = 'hacker-class';
            item.innerHTML = `
                <strong> Name: </strong> ${hacker.name_}
                | <a href="/hacker/${hacker.name_}/index.html" target="_blank"> View Profile </a>
            `;
            list.appendChild(item);
        });

    } catch (error) {
        console.error("Error getting hackers:", error);
        list.innerText = "Failed to load hacker list.";
    }
}

window.onload = getHackersNode;