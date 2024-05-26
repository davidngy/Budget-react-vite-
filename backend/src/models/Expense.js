import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
    {
        budget_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Budget'},
        amount: { type: Number, required: true},
        description: {type: String, required: true},
        date: { type: Date, default: Date.now}
    }
)


export default mongoose.model('Expense', expenseSchema);