import './Players.css';
import { useState } from 'react';
import Player from '../Player/Player';
import { PlayerType } from '../types/playerType';
import Modal from '../Modal/Modal';
import useTogglePopup from '../../hooks/useTogglePopup';
import SelectModal from '../SelectModal/SelectModal';

interface PlayerProps {
  players: PlayerType[];
  addPlayer: () => void;
  updateBalanceAfterTransition: (senderId: number | string, receiverId: number | string, amount: number) => void;
  updatePlayer: (updatedPlayer: PlayerType) => void;
}

function PlayersList({ players, addPlayer, updateBalanceAfterTransition, updatePlayer }: PlayerProps) {
  const { showModal, handleCloseModal, handleOpenModal } = useTogglePopup();

  const [selectedSenderId, setSelectedSenderId] = useState<string>('');
  const [selectedReceiverId, setSelectedReceiverId] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);

  const handleTransfer = () => {
    if (selectedSenderId !== selectedReceiverId && amount > 0) {
      updateBalanceAfterTransition(selectedSenderId, selectedReceiverId, amount);

      setSelectedSenderId('');
      setSelectedReceiverId('');
      setAmount(0);
    }
    handleCloseModal();
  };

  return (
    <section className="players">
      <h2 className="players__title">Список игроков</h2>
      <div className="players__box-btns">
        <button className="players__add-player" onClick={addPlayer}>
          Добавить игрока
        </button>
        <Modal
          text={'Передать деньги'}
          classBtn="players__transfer-modal"
          titleModal="Передать деньги"
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleOpenModal={handleOpenModal}
        >
          <form className="players__form">
            <SelectModal
              players={players}
              onChange={e => setSelectedSenderId(e.target.value)}
              label="Отправитель"
              selectedValue={selectedSenderId}
            />
            <SelectModal
              players={players}
              onChange={e => setSelectedReceiverId(e.target.value)}
              label="Получатель"
              selectedValue={selectedReceiverId}
            />
            <input
              className="select-modal__input"
              placeholder="Сумма"
              type="number"
              onChange={e => setAmount(Number(e.target.value))}
            />
            <button className="players__transfer-btn" onClick={handleTransfer}>
              Передать
            </button>
          </form>
        </Modal>
      </div>
      <ul className="players-list">
        {players.map(player => (
          <Player key={player.id} player={player} updatePlayer={updatePlayer} />
        ))}
      </ul>
    </section>
  );
}

export default PlayersList;
