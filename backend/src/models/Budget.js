import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
        total_budget: { type: Number, required: true}
    }
)


export default mongoose.model('Budget', budgetSchema);