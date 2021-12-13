import { useForm } from "react-hook-form";

type Transaction = {
  text: string,
  amount: number
}

export default function Forms({ parentCallback }: any) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: Transaction) => {
    parentCallback(data.text, data.amount);
  }

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" {...register("text")} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
          >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" {...register("amount")} placeholder="Enter amount..." />
        </div>
        <button type="submit" className="btn">Add transaction</button>
      </form>
    </>
  );
}