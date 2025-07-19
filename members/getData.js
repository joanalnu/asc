document.addEventListener('DOMContentLoaded', function() {
    // Get member ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const memberId = urlParams.get('id');

    if (memberId) {
        fetchMemberData(memberId);
    } else {
        console.error('No member ID specified in URL');
        // Handle error (redirect or show message)
        document.getElementById('member-name').textContent = 'Member not specified';
    }
});

function fetchMemberData(memberId) {
    fetch('faculty/data.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            const member = data.faculty.find(m => m.id === memberId);
            if (member) {
                populateMemberData(member);
                document.title = `${member.name} | Center for Theoretical Physics`;
            } else {
                console.error(`Member with ID ${memberId} not found`);
                document.getElementById('member-name').textContent = 'Member not found';
            }
        })
        .catch(error => {
            console.error('Error fetching member data:', error);
            document.getElementById('member-name').textContent = 'Error loading data';
        });
}

function populateMemberData(member) {
    // Set member name in header and breadcrumb
    document.getElementById('member-name').textContent = member.name;
    document.getElementById('member-name-breadcrumb').textContent = member.name;

    // Set other member information
    document.getElementById('member-title').textContent = member.title;
    document.getElementById('member-description').textContent = member.description;
    document.getElementById('member-publications').textContent = member.publications;

    // Set contact information
    const mailElement = document.getElementById('member-mail');
    mailElement.textContent = member.contact.mail;
    mailElement.href = `mailto:${member.contact.mail}`;

    const telElement = document.getElementById('member-tel');
    telElement.textContent = member.contact.tel;
    telElement.href = `tel:${member.contact.tel}`;

    document.getElementById('member-location').textContent = member.contact.location;
}