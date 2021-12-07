import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Item from './item';

const Todos = () => {


    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState<Array<Item>>([]);
    const [doings, setDoings] = useState<Array<Item>>([]);
    const [dones, setDones] = useState<Array<Item>>([]);
    const [deadSelect, setDeadSelect] = useState(false);
    const [deadline, setDeadline] = useState(new Date);
    const [now, setNow] = useState(new Date());


    useEffect(() => {
        let item1 = new Item("hello there");
        let item2 = new Item("general kenobi");
        let item3 = new Item("dew it");
        let item4 = new Item("I am the senate");
        let item5 = new Item("you underestimate my power");
        let item6 = new Item("another happy landing");
        setTodos([item1, item2]);
        setDoings([item4, item3]);
        setDones([item5, item6]);

        const timer = setInterval(() => {
            setNow(new Date());
        }, 60 * 1000);
        return () => {
            clearInterval(timer);
        }

    }, []);



    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newTodo) return;
        let item;

        if (!deadSelect) {
            item = new Item(newTodo)
        } else {
            item = new Item(newTodo, deadline)
        }

        setTodos([item, ...todos]);
        setNewTodo("");
        setDeadSelect(false);
    };


    const removeTodo = (removeIndex: number) => {
        if (window.confirm("Are you sure you wish to delete this item?")) {
            setTodos(todos.filter((_, index) => index !== removeIndex))
        } 
    };

    const removeDoing = (removeIndex: number) => {
        if (window.confirm("Are you sure you wish to delete this item?")) {
            setDoings(doings.filter((_, index) => index !== removeIndex))
        }
    };

    const removeDone = (removeIndex: number) => {
        if (window.confirm("Are you sure you wish to delete this item?")) {
            setDones(dones.filter((_, index) => index !== removeIndex))
        }
    };


    const todoToDoing = (moveIndex: number) => {
        setDoings([todos[moveIndex], ...doings]);
        setTodos(todos.filter((_, index) => index !== moveIndex))
    }

    const doingToTodo = (moveIndex: number) => {
        setTodos([doings[moveIndex], ...todos]);
        setDoings(doings.filter((_, index) => index !== moveIndex))
    }

    const doingToDone = (moveIndex: number) => {
        setDones([doings[moveIndex], ...dones]);
        setDoings(doings.filter((_, index) => index !== moveIndex))
    }

    const doneToDoing = (moveIndex: number) => {
        setDoings([dones[moveIndex], ...doings]);
        setDones(dones.filter((_, index) => index !== moveIndex))
    }

    const updateClock = () => {
        
    }



    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                margin: "0 auto",
                padding: 8,
            }}
            >


            {/* "Todo" column here below */}
            <div        
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                    margin: "0 auto",
                }}
            >
                <h2 style={{ textAlign: "center" }}>Todo</h2>
                <form
                    onSubmit={onSubmit}
                    style={{ display: "flex", marginBottom: 8, height: 30 }}
                >
                    <input
                        type="text"
                        name="newTodo"
                        id="newTodo"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Fix the thing.."
                        style={{
                            display: "inline-flex",
                            flex: 1,
                            padding: 4,
                            border: "1px solid #eaeaea",
                            marginRight: 4,
                        }}
                    />
                    <button
                        type="submit"
                        style={{ borderColor: "#eaeaea", backgroundColor: "#fff" }}
                    >
                    Add
                    </button>
                </form>

                {/* "Deadline" input here below */}
                <div
                    style={{
                        flexDirection: "row",
                        height: 30,
                    }}
                >
                    
                    <div>
                        <DatePicker
                            selected={(deadSelect ? deadline : null)}
                            onChange={(date: Date) => {
                                setDeadline(date!);
                                setDeadSelect(true);
                            }}
                            showTimeSelect
                            placeholderText="Set a deadline"
                        />
                    </div>
                </div>

                <div>
                    {todos.length === 0 && (
                    <div style={{ textAlign: "center" }}>Add some todos</div>
                    )}
                    {todos.map((todo, i) => (
                        <div
                            style={{
                                padding: 4,
                                borderBottom: "1px solid #ccc",
                                flexDirection: "column",
                                backgroundColor: todo.deadline === undefined ? "#fffff" : ((todo.deadline?.valueOf() - 60*60*1000 < now.valueOf()) ? "#fe961e" : "#fffff")
                            }}
                        >
                            <div
                                key={`${todo}-${i}`}
                                style={{
                                    display: "flex",
                                }}
                            >
                            <span style={{ flex: 1 }}>{todo.task}</span>
                            <span
                                style={{ cursor: "pointer", paddingLeft: 3, paddingRight: 3 }}
                                onClick={() => removeTodo(i)}
                            >
                                &times;
                            </span>
                            <span
                                style={{ cursor: "pointer", paddingLeft: 3, paddingRight: 3 }} 
                                onClick={() => todoToDoing(i)}
                            >
                                &rarr;
                            </span>
                        </div>
                        <div>
                            <span>{todo.deadline?.toLocaleDateString()}</span>
                            <small> {todo.deadline === undefined ? "" : " - "}  </small>
                            <span>{todo.deadline?.toLocaleTimeString()}</span>
                        </div>
                    </div>
                    ))}
                </div>
            </div>


            {/* "Doing" column here below */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                    margin: "0 auto",
                    paddingRight: 5,
                    paddingLeft: 5,
                }}
            >
                <h2 style={{ textAlign: "center" }}>Doing</h2>
                <div
                    style={{
                        paddingTop: 68,
                    }}
                >
                    {doings.length === 0 && (
                        <div style={{ textAlign: "center" }}>Do something!</div>
                    )}
                    {doings.map((doing, i) => (
                        <div
                            style={{
                                padding: 4,
                                borderBottom: "1px solid #ccc",
                                flexDirection: "column",
                                backgroundColor: doing.deadline === undefined ? "#fffff" : ((doing.deadline?.valueOf() - 60 * 60 * 1000 < now.valueOf()) ? "#fe961e" : "#fffff")
                            }}
                        >
                            <div
                                key={`${doing}-${i}`}
                                style={{
                                    display: "flex",
                                }}
                            >
                                <span style={{ flex: 1 }}>{doing.task}</span>
                                <span
                                    style={{ cursor: "pointer", paddingLeft: 3, paddingRight: 3 }}
                                    onClick={() => doingToTodo(i)}
                                >
                                    &larr;
                                </span>
                                <span
                                    style={{ cursor: "pointer", paddingLeft: 3, paddingRight: 3 }}
                                    onClick={() => removeDoing(i)}
                                >
                                    &times;
                                </span>
                                <span
                                    style={{ cursor: "pointer", paddingLeft: 3, paddingRight: 3 }}
                                    onClick={() => doingToDone(i)}
                                >
                                        &rarr;
                                </span>
                            </div>
                            <div>
                                <span>{doing.deadline?.toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



            {/* "Done" column here below */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                    margin: "0 auto",
                }}
            >
                <h2 style={{ textAlign: "center" }}>Done</h2>

                <div
                    style={{
                        paddingTop: 68,
                    }}
                >
                    {dones.length === 0 && (
                        <div style={{ textAlign: "center" }}>get something done</div>
                    )}
                    {dones.map((done, i) => (
                        <div
                            key={`${done}-${i}`}
                            style={{
                                padding: 4,
                                borderBottom: "1px solid #ccc",
                                display: "flex",
                            }}
                        >
                            <span style={{ flex: 1 }}>{done.task}</span>
                            <span
                                style={{ cursor: "pointer", paddingLeft: 3, paddingRight: 3 }}
                                onClick={() => doneToDoing(i)}
                            >
                                &larr;
                            </span> 
                            <span
                                style={{ cursor: "pointer" }}
                                onClick={() => removeDone(i)}
                            >
                                &times;
                        </span>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    );
}

export default Todos;
