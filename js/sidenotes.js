// Constants.
const MOBILE_BREAKPOINT = 1200;
const RESIZE_DEBOUNCE_DELAY = 250;

// Helper functions.
const isMobileView = () => window.innerWidth <= MOBILE_BREAKPOINT;

const getMobileNote = ref => ref.nextElementSibling.nextElementSibling;

const isMobileNote = element => element && element.classList.contains('mobile-note');

const closeAllFootnotes = () => {
    document.querySelectorAll('.mobile-note.active').forEach(note => {
        note.classList.remove('active');
    });
};

const closeOtherFootnotes = currentNote => {
    document.querySelectorAll('.mobile-note.active').forEach(note => {
        if (note !== currentNote) note.classList.remove('active');
    });
};

const toggleFootnote = note => {
    note.classList.toggle('active');
    if (note.classList.contains('active')) {
        note.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};

// Sidenotes functionality.
document.addEventListener('DOMContentLoaded', function () {
    // Handle click events on footnote references.
    const sidenoteRefs = document.querySelectorAll('.sidenote-ref');
    sidenoteRefs.forEach(ref => {
        ref.addEventListener('click', e => {
            if (isMobileView()) {
                e.preventDefault();
                const mobileNote = getMobileNote(ref);
                if (isMobileNote(mobileNote)) {
                    closeOtherFootnotes(mobileNote);
                    toggleFootnote(mobileNote);
                }
            }
        });
    });

    // Handle window resize events.
    const resizeTimer = { current: null };
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer.current);
        resizeTimer.current = setTimeout(() => {
            if (!isMobileView()) {
                closeAllFootnotes();
            }
        }, RESIZE_DEBOUNCE_DELAY);
    });
});