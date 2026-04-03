import React from 'react'
import styles from './feed-info.module.css'
import {useAppSelector} from '../../../services'
import {TOrderItem} from "../../../utils/types";

const FeedInfo = () => {
  const { total, totalToday, orders } = useAppSelector((state) => state.ws)
  const ordersDone = orders.filter((item) => item.status === 'done')
  const ordersPending = orders.filter((item) => item.status === 'pending')

  const renderColumn = (list: typeof orders) => {
    const firstColumn = list.slice(0, 7)
    const secondColumn = list.slice(7, 14)

    return (
        <>
          <div className={styles.column}>
            {firstColumn.map((item: TOrderItem) => (
                <div key={item._id} className="text text_type_digits-default">
                  {item.number}
                </div>
            ))}
          </div>
          {secondColumn.length > 0 && (
              <div className={styles.column}>
                {secondColumn.map((item: TOrderItem) => (
                    <div key={item._id} className="text text_type_digits-default">
                      {item.number}
                    </div>
                ))}
              </div>
          )}
        </>
    );
  };

  return (
    <section className={`${styles.section} mt-15`}>
      <div className={`${styles.block_list} mb-10`}>
        <div className={styles.part}>
          <div className='text text_type_main-medium mb-6'>Готовы:</div>
          <div className={styles.table_done}>{renderColumn(ordersDone)}</div>
        </div>

        <div className={styles.part}>
          <div className='text text_type_main-medium mb-6'>В работе:</div>
          <div className={styles.table}>{renderColumn(ordersPending)}</div>
        </div>
      </div>

      <div className='text text_type_main-medium'>Выполнено за все время</div>
      <div className='text text_type_digits-large mb-10'>{total}</div>
      <div className='text text_type_main-medium'>Выполнено за сегодня</div>
      <div className='text text_type_digits-large'>{totalToday}</div>
    </section>
)
}

export default FeedInfo