function injectSidebar() {
    // Create an iframe to serve as the sidebar
    const sidebarFrame = document.createElement('iframe');
    sidebarFrame.id = 'ai-summary-sidebar';
    sidebarFrame.style.cssText = `
        position: fixed;
        top: 0;
        right: -300px; // Start hidden off-screen
        width: 300px;
        height: 100%;
        border-left: 1px solid #ccc;
        display: block;
        z-index: 1000;
        transition: right 0.5s; // Smooth transition for sliding
    `;
    sidebarFrame.src = chrome.runtime.getURL('sidebar.html');

    // Append the sidebar to the body
    document.body.appendChild(sidebarFrame);

    // Prepare the body's margin for the sidebar
    document.body.style.transition = 'margin-right 0.5s'; // Smooth transition
    document.body.style.marginRight = '0';

    // Add toggle button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggle-sidebar';
    toggleButton.innerText = 'Show';
    toggleButton.style.cssText = 'position: fixed; top: 50%; right: 10px; transform: translateY(-50%); z-index: 1001; cursor: pointer;';

    toggleButton.onclick = function () {
        const sidebar = document.getElementById('ai-summary-sidebar');
        if (sidebar.style.right === '0px') {
            sidebar.style.right = '-300px'; // Move sidebar off-screen
            document.body.style.marginRight = '0'; // Remove margin
            toggleButton.innerText = 'Show';
            toggleButton.style.right = '10px'; // Button moves to edge
        } else {
            sidebar.style.right = '0px'; // Move sidebar on-screen
            document.body.style.marginRight = '300px'; // Adjust body margin
            toggleButton.innerText = 'Hide';
            toggleButton.style.right = '310px'; // Button moves with sidebar
        }
    };

    document.body.appendChild(toggleButton);
}

// Only inject the sidebar if it doesn't already exist
if (!document.querySelector('#ai-summary-sidebar')) {
    injectSidebar();
}
