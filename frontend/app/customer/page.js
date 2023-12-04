"use client";
import { RiArrowLeftLine } from "react-icons/ri";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTransition, animated } from "@react-spring/web";
import { ImSpinner8 } from "react-icons/im";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi"
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory, fetchInventoryIds, initiateTransaction, resetTransaction, setFocusedItem } from "@/states/actions/inventoryActions";
import axios from 'axios'
import { PORT } from "@/states/env";

const Page = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState({});
  const [windowOpen, setWindowOpen] = useState(false);
  const [basis, setBasis] = useState(2);
  const router = useRouter()
  const { ids, focusedInventory, focusedItem } = useSelector(state => state.inventory)
  const dispatch = useDispatch()

  const handleChangeMachine = (id) => {
    dispatch(fetchInventory(id))
  };
  const handleSelect = async (key) => {
    dispatch(setFocusedItem(focusedInventory.items[key])
    )
    // DIVIDER
    // const config = {
    //   header: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // const { data } = await axios.post(
    //   'http://127.0.0.1:5007/restocker/login',
    //   {
    //     username: 'michael',
    //     password: '1234512312'
    //   },
    // DIVIDER 
    // const { data } = await axios.put(
    //   'http://127.0.0.1:5007/inventory/1',
    //   {
    //     item_id: 1,
    //     quantity: 2,
    //     method: 'subtract'
    //   },
    // DIVIDER
    // PUT INVENTORY
    // const { data } = await axios.put(
    //   'http://127.0.0.1:5006/inventory/1',
    //   {
    //     target_item_id :1,
    //     quantity : 5
    //   },
    // console.log(data)
    setWindowOpen(true);
  };
  const handlePurchase = async (item) => {
    console.log("PURCHASING")
    console.log(item)

    let today = new Date()
    let trans = {
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      time: formatDate(today),
      inventory_id: focusedInventory.id,
      method: item.method
    }
    console.log(trans)
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      'http://127.0.0.1:500/transaction',
      trans,
    )
    console.log("RECEIPT")
    setReceipt(trans)
    if (true) {
      const { data } = await axios.put(
        `http://127.0.0.1:${PORT}/inventory/${trans.inventory_id}`,
        {
          quantity: item.quantity - 1,
          item_id: item.id
        },
      )
      setWindowOpen(false)
      handleChangeMachine(trans.inventory_id)
      console.log(data)
    }

  }
  useEffect(() => {
    dispatch(fetchInventoryIds())
  }, [])
  useEffect(() => {
    setTimeout(() => setMessage(""), 3000);
  }, [message]);
  useEffect(() => {
    setTimeout(() => setError(""), 3000);
  }, [error]);

  const transitions = useTransition(focusedInventory, {
    // ref: transRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(20%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-15%,0,0)" },
    trail: 200,
    // exitBeforeEnter: true,
  });
  return (
    <div className="w-full">
      <OrderWindow
        open={windowOpen}
        setWindowOpen={setWindowOpen}
        handlePurchase={handlePurchase}
      />
      {receipt.time && <div className="fixed bottom-2 right-2 p-2 flex flex-col gap-2 border-[1px] border-gray-500">
        <h1 className="text-xl border-b border-gray-300 pb-1">RECEIPT</h1>
      <span className="font-semibold">Item name</span>
        <span>{receipt.item_id}</span>
        <span className="font-semibold">Inventory Id</span>
        <span>{receipt.inventory_id}</span>
        <span className="font-semibold">Method</span>
        <span>{receipt.method}</span>
        <span className="font-semibold">Time</span>
        <span>{receipt.time}</span>
      </div>}
      {/* HEADER DIVIDER */}
      <div className="py-6 mb-4 bg-blacks-1 text-white flex items-center">
        <button onClick={() => router.back()}>
          <RiArrowLeftLine className="text-2xl mx-3" />
        </button>
        <h1 className=" text-3xl flex ml-1">
          Transaction Simulator
        </h1>
      </div>
      {/* INVENTORY IDS DIVIDER */}
      <div className="text-center text-xl flex max-w-full md:max-w-[50vw] mx-auto items-center mb-2">
        {ids &&
          ids.map((id, index) => (
            <button
              key={index}
              className="p-2  border-2 aspect-square min-w-[50px]"
              onClick={() => handleChangeMachine(id)}
            >
              {id}
            </button>
          ))}
        <div className="grow flex justify-end">
          <button
            className=" text-2xl p-4 opacity-80"
            onClick={() => setBasis((x) => (x + 1) % 4)}
          >
            <BsFillGridFill />
          </button>
        </div>
      </div>
      {/* ITEMS GRID DIVIDER */}
      <div className="w-full max-w-full border-2 md:max-w-[50vw] mx-auto relative">
        {transitions((style, i) => (
          <animated.div style={style} className="flex flex-wrap absolute w-full">
            {i &&
              i.items.map((item, index) => (
                <Item
                  basis={basis}
                  key={index}
                  item={{ ...item, key: index }}
                  handleSelect={handleSelect}
                  index={index}
                />
              ))}
          </animated.div>
        ))}
      </div>
    </div>
  );
};

// DIVIDER ITEM
const Item = ({ basis, item, handleSelect, index }) => {
  return (
    <div
      className="p-2 shrink grow basis-1/3 max-w-[1/3]"
      style={{
        // flexBasis: `${(1 / (basis + 1)) * 100}%`,
        // maxWidth: `${100 / (basis + 1)}%`,
      }}
    >
      <button
        className="w-full bg-gray-200 dark:bg-gray-800 hover:bg-blacks-1 hover:text-white duration-500 rounded-sm p-2 flex flex-col items-center shrink-0   "
        onClick={(e) => handleSelect(index)}
      >
        <div className="shrink-0">
          <Image
            alt="icon"
            src="/icons/chips-1.png"
            // src={item.icon}
            width={70}
            height={70}
            className="ico z-0"
          />
        </div>
        <div className=" text-left flex flex-col grow shrink whitespace-nowrap truncate">
          <span className="text-lg font-bold truncate ">{item.name}</span>
          {/* <span>stock: {item.stock}</span> */}
        </div>
        <span className="text-lg shrink-0 basis-2 grow text-right ">
          ${Number(item.price).toFixed(2)}
        </span>
      </button>
    </div>
  );
};

// DIVIDER ORDER WINDOW: display item selected
const OrderWindow = ({ setWindowOpen, open, handlePurchase }) => {
  const { focusedItem } = useSelector(state => state.inventory)
  const dispatch = useDispatch()
  const divStyle = {
    display: open ? "flex" : "none",
  };
  const handleClose = () => {
    setWindowOpen(false);
    dispatch(resetTransaction())
  };
  // const handleChangeItem = (move) => {
  //   let idx = (Math.abs(itemKey + move + focusedInventory.items.length) % focusedInventory.items.length)
  //   dispatch(setFocusedItem(focusedInventory.items[idx]))
  // };
  // useEffect(() => {
  // if (!selectedMachine) return
  // setItem(selectedMachine.items[itemKey])
  // }, [itemKey ])
  if (!focusedItem) return <></>
  else return (
    <>
      <div
        style={divStyle}
        className="fixed w-full h-full z-10 backdrop-blur-sm flex items-center justify-center"
        onClick={() => setWindowOpen(false)}
      >
        <div
          className="flex flex-wrap md:flex-nowrap gap-4 w-full z-20 items-stretch  max-w-3xl fixed aspect-[9/4] "
          onClick={(e) => e.stopPropagation()}
        >
          {/* ITEM DIVIDER CONTAINER */}
          <div className="basis-1/3 grow relative bg-white rounded-lg flex items-center flex-col  justify-center">
            <span className="top-0 -translate-y-full text-white text-lg left-0 absolute font-semibold">Your Order</span>
            {/* <button className="text-3xl hidden md:block" onClick={() => handleChangeItem(1)}><BiSolidUpArrow /></button> */}
            <div className="py-4 flex flex-col items-center justify-center ">
              <div className="">
                <Image
                  alt="icon"
                  src="/icons/chips-1.png"
                  // src={focusedItem.icon}
                  width={70}
                  height={70}
                  className="ico z-0"
                />
              </div>
              <div className="text-left">
                <span className="text-lg font-bold">{focusedItem.name}</span>
              </div>
              <div className="text-left">
                <span className="text-md">Stock: {focusedItem.quantity}</span>
              </div>
              <span className="text-md">${Number(focusedItem.price).toFixed(2)}</span>
            </div>
            {/* <button className="text-3xl hidden md:block" onClick={() => handleChangeItem(-1)}><BiSolidDownArrow /></button> */}
          </div>

          {/* PAYMENT DIVIDER CONTAINER */}
          <div className="basis-2/3 grow bg-white rounded-lg p-4 px-10 flex items-center relative justify-between">
            <span className="top-0 -translate-y-full text-white text-lg left-0 absolute font-semibold hidden md:block">Payment Method</span>
            <div className=" w-full aspect-video flex justify-center items-stretch">
              <PayWindow
                handlePurchase={handlePurchase}
                open={open}
              />
            </div>
          </div>

          <button
            className=" p-2 rounded-md absolute bottom-0 translate-y-[110%] font-semibold text-red-100 border-[2px] "
            onClick={() => handleClose()}
          >
            Back
          </button>
        </div>
      </div>

      <div
        style={divStyle}
        className="fixed h-full w-full opacity-80 z-[9] bg-gray-800 "
        onClick={() => handleClose()}
      />
    </>
  );
};

// DIVIDER PAY WINDOW: display payment options
const PayWindow = ({ open, handlePurchase }) => {
  const [payMethod, setPayMethod] = useState('cash')
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);
  const { focusedInventory, focusedItem, transaction } = useSelector(state => state.inventory)
  const dispatch = useDispatch()
  const PayCashStyle = {
    backgroundColor: payMethod == "cash" ? "#222" : "transparent",
    color: payMethod == "cash" ? "white" : "inherit",
  };
  const PayCardStyle = {
    backgroundColor: payMethod != "cash" ? "#222" : "transparent",
    color: payMethod != "cash" ? "white" : "inherit",
  };

  const transitions = useTransition(statusIdx, {
    keys: null,
    from: { opacity: 0, transform: "translate3d(0,10%,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0%,-10%,0)" },
    config: {
      duration: 210,
    },
    exitBeforeEnter: true,
  });
  const processOrder = (itemBought, method) => {
    // const order = {
    //   status: 'selecting',
    //   complete: false,
    //   inventoryId: focusedInventory.id,
    //   itemId: focusedItem.id,
    //   itemName: focusedItem.name,
    //   price: focusedItem.price,
    //   method: method
    // }
    handlePurchase({ ...itemBought, method })

  };

  useEffect(() => {
    // if (!transaction) return;
    // if (transaction.payMethod == "cash") {
    //   setTimeout(() => setStatusIdx(2), 2000);
    //   setTimeout(() => setStatusIdx(6), 4800);
    //   setTimeout(() => setStatusIdx(3), 6500);
    // } else {
    //   setStatusIdx(0);
    //   // AUTHENTICATING CARD START AT 1000ms
    //   setTimeout(() => setStatusIdx(4), 1000);
    //   // CARD APPROVCED
    //   setTimeout(() => setStatusIdx(5), 3500);
    //   // VENDING
    //   setTimeout(() => setStatusIdx(2), 5000);
    //   // TRANSACTION COMPLETE
    //   setTimeout(() => setStatusIdx(3), 7300);
    // }
    // CHANGE STATUS DEPENDING ON TRANSACTION PROCESSING
  }, [transaction.status]);
  useEffect(() => {
    if (!open) {
      setReceiptOpen(false)
      setStatusIdx(0);
    }
  }, [open]);

  // DIVIDER RECEIPT WINDOW IF OPEN
  if (receiptOpen && transaction.complete) {
    return (
      <div className="flex justify-center flex-col w-full">
        <span className="text-lg font-semibold text-center">Transaction Data</span>
        <div className="flex">
          <span>Machine ID</span>
          <span className="grow text-right">{transaction.inventoryId}</span>
        </div>
        <div className="flex">
          <span>Item ID</span>
          <span className="grow text-right">{transaction.itemId}</span>
        </div>
        <div className="flex">
          <span>Item Name</span>
          <span className="grow text-right">{transaction.itemName}</span>
        </div>
        <div className="flex">
          <span>Price Paid</span>
          <span className="grow text-right">${transaction.price}</span>
        </div>
        <div className="flex">
          <span>Payment Method</span>
          <span className="grow text-right">{transaction.method}</span>
        </div>
        <div className="flex">
          <span>Date & Time</span>
          <span className="grow text-right">{transaction.date}</span>
        </div>

        <button className="p-1 rounded-sm bg-red-100" onClick={() => setReceiptOpen(false)}>Close</button>
      </div>
    );
  }
  // DIVIDER PROCESSING TRANSACTION WINDOW
  if (transaction.complete)
    return (
      <div className="  flex items-center flex-col justify-center ">
        {/* <div className="text-[2rem] md:text-[1vw]">
          {statusIdx != 3 ? (
            <ImSpinner8 className="spinner" />
          ) : (
            <AiOutlineCheckCircle />
          )}
        </div> */}
        {/* {transitions((style, index) => {
          const Status = states[index];
          return (
            <Status
              style={style}
              change={transaction.item.fund - transaction.item.price}
              name={transaction.item.name}
            />
          );
        })} */}
        <div className=" min-h-[2rem] mt-2">
          {transaction.complete ? (
            <button
              className="fade border-[1px] h-full px-2 border-black rounded-sm"
              onClick={() => setReceiptOpen(true)}
            >
              View Receipt
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  // DIVIDER TAKING PAYMENT WINDOW
  else
    return (
      <div className="flex flex-col w-full">
        <div className="flex gap-6 items-start w-full mb-4 grow ">
          <button
            className="rounded-md border-2 border-gray-900 grow p-3"
            style={PayCashStyle}
            onClick={() => setPayMethod("cash")}
          >
            Pay with cash
          </button>
          <button
            className="rounded-md border-2 border-gray-900 grow p-3"
            style={PayCardStyle}
            onClick={() => setPayMethod("card")}
          >
            Pay with card
          </button>
        </div>
        <PaymentSelector
          method={payMethod}
          item={focusedItem}
          processOrder={processOrder}
        />
      </div>
    );
};


// DIVIDER SELECTOR FOR CASH OR CARD UI
const PaymentSelector = ({ method, item, processOrder }) => {
  const [fund, setFund] = useState(0);
  const [loadingCash, setLoadingCash] = useState(false);

  const handleCashInsert = (val) => {
    setLoadingCash(true);
    setTimeout(() => setLoadingCash(false), 2000);
    setTimeout(() => {
      if (fund + val >= item.price) {
        setFund(0)
        processOrder({ ...item, fund: fund + val }, "cash");
      }
    }, 2000);
    setTimeout(() => {
      setFund((x) => x + val);
    }, 800);
  };

  const handleCardUse = () => {
    processOrder(item, "card");
  };

  // DIVIDER CASH METHOD
  if (method == "cash")
    return (
      <div className="flex flex-col grow">
        <div className="basis-full flex">
          <div className="text-green-200 flex flex-col basis-full text-3xl p-2 items-center justify-center bg-gray-900 rounded-sm">
            <span>${fund}</span>
            <span className="text-sm">Insert cash</span>
          </div>
        </div>
        {!loadingCash ? (
          <div className="basis-full flex  gap-2 mt-4 font-semibold">
            <button
              className="grow bg-green-300 rounded-md"
              onClick={() => handleCashInsert(1)}
            >
              {" "}
              $1
            </button>
            <button
              className="grow bg-green-300 rounded-md"
              onClick={() => handleCashInsert(5)}
            >
              $5
            </button>
            <button
              className="grow bg-green-300 rounded-md"
              onClick={() => handleCashInsert(10)}
            >
              $10
            </button>
          </div>
        ) : (
          <div className="basis-full mt-2 flex items-center justify-center">
            Inserting Cash
            <ImSpinner8 className="spinner text-[2.5vw] ml-2" />
          </div>
        )}
      </div>
    );
  // DIVIDER CARD METHOD
  else
    return (
      <div className="flex flex-wrap">
        <div className="basis-4/6 grow p-2">
          <input
            placeholder="Card Number"
            className="border-[1px] border-black p-2 grow rounded-md w-full"
          />
        </div>
        <div className="basis-2/6 grow p-2">
          <input
            placeholder="CVC"
            className="border-[1px] border-black p-2 rounded-md w-full"
          />
        </div>
        <div className="basis-1/2 grow p-2">
          <input
            placeholder="Exp date"
            className="border-[1px] border-black p-2 rounded-md w-full"
          />
        </div>
        <div className="basis-1/2 grow p-2">
          <input
            placeholder="Zipcode"
            className="border-[1px] border-black p-2 rounded-md w-full"
          />
        </div>
        <button
          className="basis-full bg-black text-white rounded-md p-3 mt-2"
          onClick={handleCardUse}
        >
          Pay ${Number(item.price).toFixed(2)}
        </button>
      </div>
    );
};
export default Page;

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
