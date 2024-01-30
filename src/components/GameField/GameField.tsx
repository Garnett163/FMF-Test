import './GameField.css';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import Players from '../Players/Players';
import Modal from '../Modal/Modal';
import { PlayerType } from '../types/playerType';
import ActionHistory from '../ActionHistory/ActionHistory';
import useTogglePopup from '../../hooks/useTogglePopup';

function GameField() {
  const { showModal, handleCloseModal, handleOpenModal } = useTogglePopup();
  const [players, setPlayers] = useState<PlayerType[]>(JSON.parse(localStorage.getItem('players') || '[]'));
  const [transactions, setTransactions] = useState<string[]>(JSON.parse(localStorage.getItem('history') || '[]'));
  const [playerOutMessage, setPlayerOutMessage] = useState<string[]>(
    JSON.parse(localStorage.getItem('playerOut') || '[]'),
  );

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players));
    localStorage.setItem('history', JSON.stringify(transactions));
    localStorage.setItem('gameSaved', 'true');
    localStorage.setItem('playerOut', JSON.stringify(playerOutMessage));
  }, [playerOutMessage, players, transactions]);

  const addPlayer = () => {
    const newPlayer: PlayerType = {
      id: uuidv4(),
      name: `Игрок ${players.length + 1}`,
      balance: 15000000,
    };
    setPlayers([...players, newPlayer]);
    setTransactions([...transactions, `Добавлен новый игрок: ${newPlayer.name}`]);
  };

  const checkBalance = (updatedPlayers: PlayerType[]) => {
    const outPlayers = updatedPlayers.filter(player => player.balance < -5000000);
    if (outPlayers.length > 0) {
      const remainingPlayers = updatedPlayers.filter(player => player.balance >= -5000000);
      setPlayers(remainingPlayers);

      const outPlayersMsgs = outPlayers.map(outPlayer => `${outPlayer.name} выбыл из игры: баланс меньше -5 миллионов`);
      setPlayerOutMessage(prevMessages => [...prevMessages, ...outPlayersMsgs]);
    }
  };

  const updatePlayer = (updatedPlayer: PlayerType) => {
    if (updatedPlayer.balance < -5000000) {
      checkBalance([...players, updatedPlayer]);
      setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== updatedPlayer.id));
    } else {
      setPlayers(prevPlayers => prevPlayers.map(player => (player.id === updatedPlayer.id ? updatedPlayer : player)));
      setTransactions(prevTransactions => [
        ...prevTransactions,
        `${updatedPlayer.name} теперь имеет баланс ${updatedPlayer.balance}`,
      ]);
    }
  };

  const updateBalanceAfterTransition = (senderId: number | string, receiverId: number | string, amount: number) => {
    const updatedPlayers = players.map(player => {
      if (player.id === senderId) {
        const newBalance = player.balance - amount;
        if (newBalance < -5000000) {
          return { ...player, balance: newBalance, isOut: true };
        }
        return { ...player, balance: newBalance, isOut: false };
      } else if (player.id === receiverId) {
        return { ...player, balance: player.balance + amount, isOut: false };
      }
      return player;
    });

    setPlayers(updatedPlayers);
    setTransactions([
      ...transactions,
      `${players.find(player => player.id === senderId)?.name} передал ${amount} монет игроку ${
        players.find(player => player.id === receiverId)?.name
      }`,
    ]);

    checkBalance(updatedPlayers);
  };

  useEffect(() => {
    const isGameSaved = localStorage.getItem('gameSaved') === 'true';
    if (isGameSaved) {
      handleOpenModal();
    }
  }, [handleOpenModal]);

  const handleStartNewGame = () => {
    localStorage.clear();
    setPlayers([]);
    setTransactions([]);
    setPlayerOutMessage([]);
    handleCloseModal();
  };

  const handleContinueGame = () => {
    handleCloseModal();
  };

  return (
    <main className="game-field">
      <Players
        players={players}
        addPlayer={addPlayer}
        updateBalanceAfterTransition={updateBalanceAfterTransition}
        updatePlayer={updatePlayer}
      />
      <ActionHistory transactions={transactions} playerOutMessage={playerOutMessage} />
      <Modal
        classBtn="game-field__modal"
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
      >
        <div className="game-field__container">
          <button className="game-field__modal-continueGame" onClick={handleContinueGame}>
            Продолжить сохраненную игру
          </button>
          <button className="game-field__modal-newGame" onClick={handleStartNewGame}>
            Начать новую игру
          </button>
        </div>
      </Modal>
    </main>
  );
}

export default GameField;
