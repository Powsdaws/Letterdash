import mongoose from 'mongoose';

function toLower (v) { // rewrite emails to lowercase
	if(v){
		return v.toLowerCase();
	}
}

const Users = new mongoose.Schema({
	email: { type: String, set: toLower },
	password: String,
});

export default mongoose.model('User', Users);