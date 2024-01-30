import { useState } from 'react';
import './PlayerEditForm.css';
import { PlayerType } from '../../types/playerType';

interface PlayerEditFormProps {
  player: PlayerType;
  updatePlayer: (updatedPlayer: PlayerType) => void;
  handleCloseModal: () => void;
}

function PlayerEditForm({ player, updatePlayer, handleCloseModal }: PlayerEditFormProps) {
  const [editedName, setEditedName] = useState<string>(player.name);
  const [editedBalance, setEditedBalance] = useState<number>(player.balance);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
  };

  const handleBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedBalance(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedPlayer: PlayerType = {
      id: player.id,
      name: editedName,
      balance: editedBalance,
    };
    updatePlayer(updatedPlayer);
    handleCloseModal();
  };

  return (
    <form className="player-edit-form" onSubmit={handleSubmit}>
      <input type="text" className="player-edit-form__input" value={editedName} onChange={handleNameChange} />
      <input type="number" className="player-edit-form__input" value={editedBalance} onChange={handleBalanceChange} />
      <button type="submit" className="player-edit-form__btn">
        Изменить
      </button>
    </form>
  );
}

export default PlayerEditForm;
