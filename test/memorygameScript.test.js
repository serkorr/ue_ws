import { incTime, fisherYatesShuffle, createBoard, checkForMatch, flipCard, unfoundBg, foundBg } from '../js/memorygameScript';

describe('Memory Game', () => {
    let timeElement;
    let boardElement;
    let attemptsCounterElement;

    beforeEach(() => {
        jest.useFakeTimers();

        // Mock the DOM elements
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

    afterEach(() => {
        jest.clearAllTimers();
        document.body.innerHTML = '';
    });

    test('incTime should increment the time counter', () => {
        incTime();
        expect(timeElement.innerText).toBe('1');
    });

    test('fisherYatesShuffle should shuffle the array', () => {
        const arr = [1, 2, 3, 4, 5];
        fisherYatesShuffle(arr);
        expect(arr).not.toEqual([1, 2, 3, 4, 5]);
    });

    test('createBoard should create cards on the board', () => {
        const cards = [
            { id: "1", image: "pics/card1.png" },
            { id: "1", image: "pics/card16.png" }
        ];

        createBoard(boardElement, cards, () => {});

        expect(boardElement.children.length).toBe(cards.length);
        for (let i = 0; i < cards.length; i++) {
            expect(boardElement.children[i].getAttribute('src')).toBe(unfoundBg);
        }
    });

    test('flipCard should flip the card and check for match', () => {
        const cards = [
            { id: "1", image: "pics/card1.png" },
            { id: "1", image: "pics/card16.png" }
        ];

        createBoard(boardElement, cards, () => {});

        const cardElement1 = boardElement.children[0];
        const cardElement2 = boardElement.children[1];

        flipCard(cards, cardElement1, () => {
            checkForMatch(cards, attemptsCounterElement);
        });

        expect(cardElement1.getAttribute('src')).toBe('pics/card1.png');

        flipCard(cards, cardElement2, () => {
            checkForMatch(cards, attemptsCounterElement);
        });

        expect(cardElement2.getAttribute('src')).toBe('pics/card16.png');

        jest.runAllTimers();

        expect(cardElement1.getAttribute('src')).toBe(foundBg);
        expect(cardElement2.getAttribute('src')).toBe(foundBg);
        expect(attemptsCounterElement.textContent).toBe('1');
    });
});