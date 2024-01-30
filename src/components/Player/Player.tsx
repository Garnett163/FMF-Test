import './Player.css';
import Modal from '../Modal/Modal';
import useTogglePopup from '../../hooks/useTogglePopup';
import PlayerEditForm from './PlayerEditForm/PlayerEditForm';
import { PlayerType } from '../types/playerType';

interface PlayerProps {
  player: PlayerType;
  updatePlayer: (updatedPlayer: PlayerType) => void;
}

function Player({ player, updatePlayer }: PlayerProps) {
  const { showModal, handleCloseModal, handleOpenModal } = useTogglePopup();

  return (
    <li className="player">
      <div className="player__flex-box">
        <h3 className="player__title">{player.name}</h3>
        <Modal
          titleModal="Редактирование игрока"
          classBtn="player__editBtn"
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleOpenModal={handleOpenModal}
        >
          <PlayerEditForm player={player} updatePlayer={updatePlayer} handleCloseModal={handleCloseModal} />
        </Modal>
      </div>
      <p className="player__balance">Баланс&nbsp;: {player.balance} монет</p>
    </li>
  );
}

export default Player;
