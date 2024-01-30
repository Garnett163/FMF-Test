import './SelectModal.css';
import { PlayerType } from '../types/playerType';

interface SelectModalProps {
  players: PlayerType[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  selectedValue: number | string;
}

function SelectModal({ players, onChange, label, selectedValue }: SelectModalProps) {
  return (
    <label className="select-modal__label">
      {label}&nbsp;:
      <select className="select-modal__select" onChange={onChange} value={selectedValue}>
        <option className="select-modal__option" value="" disabled>
          Выберите игрока
        </option>
        {players.map(player => (
          <option className="select-modal__option" key={player.id} value={player.id}>
            {player.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export default SelectModal;
