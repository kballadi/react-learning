import { useState } from "react";

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const categories = ["Food", "Transport", "Entertainment", "Bills", "Other"];

  const addExpense = () => {
    if (name.trim() === "" || amount.trim() === "" || amount <= 0) {
      alert("Please enter valid expense details");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: name,
      amount: parseFloat(amount),
      category: category,
      date: new Date().toLocaleDateString(),
    };

    setExpenses([...expenses, newExpense]);
    setAmount("");
    setName("");
    setCategory("Food");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>💰 Expense Tracker</h1>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <h2>Add New Expense</h2>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Expense name (e.g., Lunch)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            placeholder="Amount (e.g., 50)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={addExpense}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Expense
        </button>
      </div>

      <div>
        <h2>Your Expenses</h2>

        {expenses.length > 0 && (
          <div
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "15px",
              borderRadius: "5px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: "0 0 5px 0" }}>Total Spent</h3>
            <p style={{ margin: "0", fontSize: "28px", fontWeight: "bold" }}>
              ${calculateTotal().toFixed(2)}
            </p>
          </div>
        )}

        {expenses.length === 0 ? (
          <p style={{ color: "#999" }}>
            No expenses yet. Add your first expense above!
          </p>
        ) : (
          <div>
            {expenses.map((expense) => (
              <div
                key={expense.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 5px 0" }}>{expense.name}</h3>
                    <p style={{ margin: "0", fontSize: "14px", color: "#666" }}>
                      {expense.category} • {expense.date}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <strong style={{ fontSize: "20px", color: "#e74c3c" }}>
                      ${expense.amount.toFixed(2)}
                    </strong>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#e74c3c",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return <ExpenseTracker />;
}

export default App;
