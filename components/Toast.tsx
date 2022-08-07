import { useState, useEffect } from 'react'

export type Props = {
  // toastList: string[]
  autoDeleteTime: number
}

const Toast: React.FC<Props> = ({ toastList, autoDeleteTime }) => {
  const [list, setList] = useState(toastList)

  useEffect(() => {
    setList([...toastList])
  }, [toastList])

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length && list.length) {
        deleteToast(toastList[0].id)
      }
    }, autoDeleteTime)

    return () => {
      clearInterval(interval)
    }

    // eslint-disable-next-line
  }, [toastList, autoDeleteTime, list])

  const deleteToast = (id) => {
    const listItemIndex = list.findIndex((e) => e.id === id)
    const toastListItem = toastList.findIndex((e) => e.id === id)
    list.splice(listItemIndex, 1)
    toastList.splice(toastListItem, 1)
    setList([...list])
  }

  return (
    <>
      <div
        className={
          'text-md fixed z-50 bottom-3 left-3 transition-transform duration-600 ease-in'
        }
      >
        {list.map((toast, i) => (
          <div
            key={i}
            className={`transition duration-300 pointer-events-auto overflow-hidden mb-1 p-4 max-h-[300px] rounded	shadow shadow-slate-50 text-black opacity-50 bg-[15px] bg-no-repeat h-[50px] w-[365px]  bottom-3 left-3 ease-in ${toast.backgroundColor}`}
          >
            <button onClick={() => deleteToast(toast.id)}>X</button>
            <div className="float-left mr-4">
              {/* <img src={toast.icon} alt="" /> */}
            </div>
            <div>
              <p className="font-bold text-md text-left mt-0 mb-2 w-[300px] h-[18px]">
                {toast.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Toast
