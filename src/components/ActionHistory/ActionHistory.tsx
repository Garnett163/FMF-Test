import './ActionHistory.css';

interface ActionHistoryProps {
  transactions: string[];
  playerOutMessage: string[];
}

function ActionHistory({ transactions, playerOutMessage }: ActionHistoryProps) {
  return (
    <section className="action-history">
      <div className="action-history__flex-box">
        <h2 className="action-history__title">История операций</h2>
        <ul className="action-history__list">
          {transactions.map((transaction, index) => (
            <li className="action-history__item" key={index}>
              {transaction}
            </li>
          ))}
        </ul>
      </div>
      <div className="action-history__flex-box">
        <h2 className="action-history__title">Выбывшие игроки</h2>
        <ul className="action-history__list">
          {playerOutMessage.map((message, index) => (
            <li className="action-history__item" key={index}>
              {message}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ActionHistory;
