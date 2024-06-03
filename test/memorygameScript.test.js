import { incTime, fisherYatesShuffle, createBoard, checkForMatch, flipCard, unfoundBg, foundBg } from '../js/memorygameScript';

describe('Memory Game', () => {
    // Declare variables to hold references to the mocked DOM elements
    let timeElement;
    let boardElement;
    let attemptsCounterElement;

    // This function will run before each test
    beforeEach(() => {
        // Use fake timers for Jest to control the passage of time in tests
        jest.useFakeTimers();

        // Create and append mock DOM elements for the game components
        timeElement = document.createElement('div');
        timeElement.id = 'time';
        document.body.appendChild(timeElement);

        boardElement = document.createElement('div');
        boardElement.id = 'spielbereich';
        document.body.appendChild(boardElement);

        attemptsCounterElement = document.createElement('div');
        attemptsCounterElement.id = 'attempts';
        document.body.appendChild(attemptsCounterElement);
    });

    // This function will run after each test
    afterEach(() => {
        // Clear all timers and reset the DOM
        jest.clearAllTimers();
        document.body.innerHTML = '';
    });

    // Test the incTime function to ensure it increments the time counter
    test('incTime should increment the time counter', () => {
        incTime();  // Call the function to increment the time
        expect(timeElement.innerText).toBe('1');  // Check if the time element's text is updated correctly
    });

    // Test the fisherYatesShuffle function to ensure it shuffles the array
    test('fisherYatesShuffle should shuffle the array', () => {
        const arr = [1, 2, 3, 4, 5];  // Define an array to shuffle
        fisherYatesShuffle(arr);  // Shuffle the array
        expect(arr).not.toEqual([1, 2, 3, 4, 5]);  // Check that the array is not in its original order
    });

    // Test the createBoard function to ensure it creates cards on the board
    test('createBoard should create cards on the board', () => {
        const cards = [
            { id: "1", image: "pics/card1.png" },
            { id: "1", image: "pics/card16.png" }
        ];

        createBoard(boardElement, cards, () => {});  // Create the board with the given cards

        expect(boardElement.children.length).toBe(cards.length);  // Check if the correct number of cards are created
        for (let i = 0; i < cards.length; i++) {
            expect(boardElement.children[i].getAttribute('src')).toBe(unfoundBg);  // Check if each card has the correct initial background
        }
    });

    // Test the flipCard function to ensure it flips the card and checks for a match
    test('flipCard should flip the card and check for match', () => {
        const cards = [
            { id: "1", image: "pics/card1.png" },
            { id: "1", image: "pics/card16.png" }
        ];

        createBoard(boardElement, cards, () => {});  // Create the board with the given cards

        const cardElement1 = boardElement.children[0];  // Get the first card element
        const cardElement2 = boardElement.children[1];  // Get the second card element

        // Flip the first card and check for a match
        flipCard(cards, cardElement1, () => {
            checkForMatch(cards, attemptsCounterElement);
        });

        expect(cardElement1.getAttribute('src')).toBe('pics/card1.png');  // Check if the first card is flipped correctly

        // Flip the second card and check for a match
        flipCard(cards, cardElement2, () => {
            checkForMatch(cards, attemptsCounterElement);
        });

        expect(cardElement2.getAttribute('src')).toBe('pics/card16.png');  // Check if the second card is flipped correctly

        jest.runAllTimers();  // Run all timers to process the match checking

        // Check if both cards are marked as found and the attempts counter is incremented
        expect(cardElement1.getAttribute('src')).toBe(foundBg);
        expect(cardElement2.getAttribute('src')).toBe(foundBg);
        expect(attemptsCounterElement.textContent).toBe('1');
    });
});