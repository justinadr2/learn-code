async function createHackerPHP() {
    const nameInput = document.getElementById('input-hacker');
    const expInput = document.getElementById('input-expertise');
    const status = document.getElementById('status');

    const name = nameInput.value;
    const expertise = expInput.value;

    if (!name || !expertise) {
        status.innerText = "Enter both name and expertise";
        return;
    }

    try {
        const response = await fetch('/PHP/create-hacker.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, expertise })
        });
        const result = await response.json();
        status.innerText = result.message;
        
        nameInput.value = '';
        expInput.value = '';
        getHackersNode();
    } catch (error) {
        status.innerText = "PHP API connection failed";
    }
}

async function createHackerNode() {
    const nameInput = document.getElementById('input-hacker');
    const expInput = document.getElementById('input-expertise');
    const fileInput = document.getElementById('input-avatar');
    const status = document.getElementById('status');

    if (!nameInput.value || !expInput.value) {
        status.innerText = "Enter both name and expertise";
        return;
    }

    const formData = new FormData();
    formData.append('name', nameInput.value);
    formData.append('expertise', expInput.value);

    if (fileInput.files[0]) {
        formData.append('avatar', fileInput.files[0]);
    }
    
    try {
        const response = await fetch('/node-api/create-hacker', {
            method: 'POST',
            body: formData
        });
        const result = await response.text();
        status.innerText = result;
        nameInput.value = '';
        expInput.value = '';
        fileInput.value = '';
        getHackersNode();
    } catch (error) {
        status.innerText = "Node connection failed";
    }
}

async function createHackerDjango() {
    const nameInput = document.getElementById('input-hacker');
    const expInput = document.getElementById('input-expertise');
    const status = document.getElementById('status');

    if (!nameInput.value || !expInput.value) {
        status.innerText = "Enter both name and expertise";
        return;
    }

    const formData = new FormData();
    formData.append('name', nameInput.value);
    formData.append('expertise', expInput.value);

    try {
        const response = await fetch('/django-api/create-hacker/', {
            method: 'POST',
            body: formData
        });
        const result = await response.text();
        status.innerText = result;
        nameInput.value = '';
        expInput.value = '';
        getHackersNode();
    } catch (error) {
        status.innerText = "Django connection failed";
    }
}

async function deleteHackerNode(name) {
    const status = document.getElementById('status');
    if (!confirm(`Are you sure you want to delete ${name}?`))
        return;

    try {
        const response = await fetch(`/node-api/delete-hacker/${encodeURIComponent(name)}`, {
            method: 'DELETE'
        });
        const result = await response.text();
        status.innerText = result;
        getHackersNode();
    } catch (error) {
        status.innerText = "Delete request failed";
    }
}

async function getHackersNode() {
    const list = document.getElementById('list-hackers');

    try {
        const response = await fetch('/node-api/get-hackers');
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
                | <a href="/hacker/${hacker.name_}" target="_blank"> View Profile </a>
                | <button onclick="deleteHackerNode('${hacker.name_}')"> Delete </button>
            `;
            list.appendChild(item);
        });
    } catch (error) {
        console.error("Error getting hackers:", error);
        list.innerText = "Failed to load hacker list.";
    }
}

window.onload = getHackersNode;