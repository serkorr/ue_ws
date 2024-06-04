import { incTime, fisherYatesShuffle, createBoard, checkForMatch, flipCard, unfoundBg, foundBg } from '../js/memorygameScript';

describe('Memory Spiel', () => {
    // Deklarieren von Variablen, um Referenzen zu den gemockten DOM-Elementen zu halten
    let timeElement;
    let boardElement;
    let attemptsCounterElement;

    // Diese Funktion wird vor jedem Test ausgeführt
    beforeEach(() => {
        // Verwenden von Fake-Timern für Jest, um den Zeitverlauf in Tests zu kontrollieren
        jest.useFakeTimers();

        // Erstellen und Anhängen gemockter DOM-Elemente für die Spielkomponenten
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

    // Diese Funktion wird nach jedem Test ausgeführt
    afterEach(() => {
        jest.clearAllTimers();
        document.body.innerHTML = '';
    });

    // 1. Testen der Funktion incTime, um sicherzustellen, dass der Zeit-Countdown erhöht wird
    test('incTime sollte den Zeit-Countdown erhöhen', () => {
        incTime();  // Aufrufen der Funktion zum Erhöhen der Zeit
        expect(timeElement.innerText).toBe('1');  // Überprüfen, ob der Text des Zeitelements korrekt aktualisiert wird
    });

    // 2. Testen der Funktion fisherYatesShuffle, um sicherzustellen, dass das Array gemischt wird
    test('fisherYatesShuffle sollte das Array mischen', () => {
        const arr = [1, 2, 3, 4, 5];  // Definieren eines Arrays zum Mischen
        fisherYatesShuffle(arr);  // Mischen des Arrays
        expect(arr).not.toEqual([1, 2, 3, 4, 5]);  // Überprüfen, dass das Array nicht in seiner ursprünglichen Reihenfolge ist
    });

    // 3. Testen der Funktion createBoard, um sicherzustellen, dass Karten auf dem Spielbrett erstellt werden
    test('createBoard sollte Karten auf dem Spielbrett erstellen', () => {
        const cards = [
            { id: "1", image: "pics/card1.png" },
            { id: "1", image: "pics/card16.png" }
        ];

        createBoard(boardElement, cards, () => {});  // Erstellen des Spielfelds mit den angegebenen Karten

        expect(boardElement.children.length).toBe(cards.length);  // Überprüfen, ob die korrekte Anzahl von Karten erstellt wurde
        for (let i = 0; i < cards.length; i++) {
            expect(boardElement.children[i].getAttribute('src')).toBe(unfoundBg);  // Überprüfen, ob jede Karte den korrekten anfänglichen Hintergrund hat
        }
    });

    // 4. Testen der Funktion flipCard, um sicherzustellen, dass die Karte umgedreht wird und nach einer Übereinstimmung sucht
    test('flipCard sollte die Karte umdrehen und nach einer Übereinstimmung suchen', () => {
        const cards = [
            { id: "1", image: "pics/card1.png" },
            { id: "1", image: "pics/card16.png" }
        ];

        createBoard(boardElement, cards, () => {});  // Erstellen des Spielfelds mit den angegebenen Karten

        const cardElement1 = boardElement.children[0];  // Erhalten des ersten Karten-Elements
        const cardElement2 = boardElement.children[1];  // Erhalten des zweiten Karten-Elements

        // Umdrehen der ersten Karte und Überprüfen auf Übereinstimmung
        flipCard(cards, cardElement1, () => {
            checkForMatch(cards, attemptsCounterElement);
        });

        expect(cardElement1.getAttribute('src')).toBe('pics/card1.png');  // Überprüfen, ob die erste Karte korrekt umgedreht wird

        // Umdrehen der zweiten Karte und Überprüfen auf Übereinstimmung
        flipCard(cards, cardElement2, () => {
            checkForMatch(cards, attemptsCounterElement);
        });

        expect(cardElement2.getAttribute('src')).toBe('pics/card16.png');  // Überprüfen, ob die zweite Karte korrekt umgedreht wird

        jest.runAllTimers();  // Ausführen aller Timer, um die Übereinstimmungsprüfung zu verarbeiten

        // Überprüfen, ob beide Karten als gefunden markiert und der Versuchszähler erhöht wurde
        expect(cardElement1.getAttribute('src')).toBe(foundBg);
        expect(cardElement2.getAttribute('src')).toBe(foundBg);
        expect(attemptsCounterElement.textContent).toBe('1');
    });

    // 5. Testen, ob der Timer stoppt, wenn alle Karten gefunden sind
    test('Timer stoppt, wenn alle Karten gefunden sind', () => {
        const cards = [
            { id: "1", image: "pics/card1.png" },
            { id: "1", image: "pics/card1.png" }
        ];

        createBoard(boardElement, cards, () => {});  // Erstellen des Spielfelds mit den angegebenen Karten

        const cardElement1 = boardElement.children[0];  // Erhalten des ersten Karten-Elements
        const cardElement2 = boardElement.children[1];  // Erhalten des zweiten Karten-Elements

        flipCard(cards, cardElement1, () => {
            checkForMatch(cards, attemptsCounterElement);
        });

        flipCard(cards, cardElement2, () => {
            checkForMatch(cards, attemptsCounterElement);
        });

        jest.runAllTimers();  // Ausführen aller Timer, um die Übereinstimmungsprüfung zu verarbeiten

        // Überprüfen, ob der Timer gelöscht wird
        expect(clearInterval).toHaveBeenCalled();
    });

    // 6. Testen, ob das Umdrehen einer Karte sie dem flippedCards-Array hinzufügt
    test('Umdrehen einer Karte fügt sie dem flippedCards-Array hinzu', () => {
        const cards = [
            { id: "1", image: "pics/card1.png" },
            { id: "2", image: "pics/card2.png" }
        ];

        createBoard(boardElement, cards, () => {});  // Erstellen des Spielfelds mit den angegebenen Karten

        const cardElement1 = boardElement.children[0];  // Erhalten des ersten Karten-Elements

        flipCard(cards, cardElement1, () => {});

        // Überprüfen, ob die ID der Karte dem flippedCards-Array hinzugefügt wurde
        expect(flippedCards.length).toBe(1);
        expect(flippedCards[0]).toBe("0");
    });

    // 7. Testen, ob nicht übereinstimmende Karten zurückgedreht werden
    test('Nicht übereinstimmende Karten werden zurückgedreht', () => {
        const cards = [
            { id: "1", image: "pics/card1.png" },
            { id: "2", image: "pics/card2.png" }
        ];

        createBoard(boardElement, cards, () => {});  // Erstellen des Spielfelds mit den angegebenen Karten

        const cardElement1 = boardElement.children[0];  // Erhalten des ersten Karten-Elements
        const cardElement2 = boardElement.children[1];  // Erhalten des zweiten Karten-Elements

        flipCard(cards, cardElement1, () => {});
        flipCard(cards, cardElement2, () => {});

        jest.runAllTimers();  // Ausführen aller Timer, um die Übereinstimmungsprüfung zu verarbeiten

        // Überprüfen, ob nicht übereinstimmende Karten zurückgedreht werden
        expect(cardElement1.getAttribute('src')).toBe(unfoundBg);
        expect(cardElement2.getAttribute('src')).toBe(unfoundBg);
    });

    // 8. Testen, ob der Versuchszähler korrekt erhöht wird
    test('Versuchszähler wird korrekt erhöht', () => {
        const cards = [
            { id: "1", image: "pics/card1.png" },
            { id: "2", image: "pics/card2.png" }
        ];

        createBoard(boardElement, cards, () => {});

        const cardElement1 = boardElement.children[0];
        const cardElement2 = boardElement.children[1];

        flipCard(cards, cardElement1, () => {
            checkForMatch(cards, attemptsCounterElement);
        });

        flipCard(cards, cardElement2, () => {
            checkForMatch(cards, attemptsCounterElement);
        });

        jest.runAllTimers();

        expect(attemptsCounterElement.textContent).toBe('1');
    });

    // 9. Testen, ob das Spiel eine Nachricht anzeigt, wenn alle Karten gefunden sind
    test('Spiel zeigt eine Nachricht an, wenn alle Karten gefunden sind', () => {
        const cards = [
            { id: "1", image: "pics/card1.png" },
            { id: "1", image: "pics/card1.png" }
        ];

        createBoard(boardElement, cards, () => {});

        const cardElement1 = boardElement.children[0];
        const cardElement2 = boardElement.children[1];

        window.alert = jest.fn();  // Mocken der Alert-Funktion

        flipCard(cards, cardElement1, () => {
            checkForMatch(cards, attemptsCounterElement);
        });

        flipCard(cards, cardElement2, () => {
            checkForMatch(cards, attemptsCounterElement);
        });

        jest.runAllTimers();

        // Überprüfen, ob eine Nachricht angezeigt wird, wenn alle Karten gefunden sind
        expect(window.alert).toHaveBeenCalledWith("GOOD JOB!");
    });

    // 10. Testen, ob doppelte Karten-IDs korrekt behandelt werden
    test('Doppelte Karten-IDs werden korrekt behandelt', () => {
        const cards = [
            { id: "1", image: "pics/card1.png" },
            { id: "1", image: "pics/card1.png" },
            { id: "1", image: "pics/card1.png" },
            { id: "2", image: "pics/card2.png" }
        ];

        createBoard(boardElement, cards, () => {});

        const cardElement1 = boardElement.children[0];
        const cardElement2 = boardElement.children[1];
        const cardElement3 = boardElement.children[2];
        const cardElement4 = boardElement.children[3];

        flipCard(cards, cardElement1, () => {});
        flipCard(cards, cardElement2, () => {});
        jest.runAllTimers();

        // Überprüfen, ob nur zwei Karten mit derselben ID als gefunden markiert sind
        expect(cardElement1.getAttribute('src')).toBe(foundBg);
        expect(cardElement2.getAttribute('src')).toBe(foundBg);
        expect(cardElement3.getAttribute('src')).toBe(unfoundBg);
        expect(cardElement4.getAttribute('src')).toBe(unfoundBg);
    });
})