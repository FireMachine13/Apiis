let currentProfile = 0;
let profiles = [];

async function fetchProfiles(gender) {
    try {
        const response = await fetch(`https://randomuser.me/api/?gender=${gender}&results=10`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error al obtener perfiles:', error);
    }
}

function showProfile(profile) {
    const profilePic = document.getElementById('profile-pic');
    const profileName = document.getElementById('profile-name');
    const profileInfo = document.getElementById('profile-info');

    profilePic.src = profile.picture.large;
    profileName.innerText = `${profile.name.first} ${profile.name.last}`;
    profileInfo.dataset.name = `${profile.name.first} ${profile.name.last}`;
    profileInfo.dataset.address = `${profile.location.street.name} ${profile.location.street.number}, ${profile.location.city}, ${profile.location.state}, ${profile.location.country}`;
    profileInfo.dataset.dob = new Date(profile.dob.date).toLocaleDateString();
    profileInfo.dataset.email = profile.email;
    profileInfo.dataset.phone = profile.phone;

    const profileContainer = document.getElementById('profile');
    profileContainer.style.display = 'block';
}

function showTooltip(prefix, key) {
    const profileInfo = document.getElementById('profile-info');
    const tooltip = document.getElementById('tooltip');
    tooltip.innerText = prefix + profileInfo.dataset[key];
    tooltip.style.display = 'block';
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}

async function nextProfile() {
    profiles = await fetchProfiles('female');
    currentProfile = (currentProfile + 1) % profiles.length;
    showProfile(profiles[currentProfile]);
}

async function prevProfile() {
    profiles = await fetchProfiles('male');
    currentProfile = (currentProfile + 1) % profiles.length;
    showProfile(profiles[currentProfile]);
}

// Initial fetch
nextProfile();
