const crypto = require('crypto');

const X = 30; // time step in s
const T0 =0;

const digits = 6;
const K = 'MzRP3UTEf(83gN3-xEjo';
let C =  Buffer.alloc(8);
const T = Math.floor(Math.floor((new Date().getTime()/1000 - T0)) / X);
C.writeBigInt64BE(BigInt(T));
console.log(generateCode(C));

function DT(string) {
	const offset = string[19] & 15;
	const P = string.slice(offset, offset + 4).readInt32BE();
	return (P & 2147483647);
}

setInterval(() => {
	let C =  Buffer.alloc(8); // counter
	const T = Math.floor(Math.floor((new Date().getTime() / 1000) - T0) / X);
	C.writeBigInt64BE(BigInt(T));
	console.log(generateCode(C));

}, X  * 1000);

function generateCode(C) {
	const HS = crypto.createHmac('sha1', K).update(C).digest();
	const Sbits = DT(HS);
	let code = (Sbits % Math.pow(10, digits)).toString(); // 6 digit code;
	if (code.length < 6) {
		code = "0".repeat( 6-code.length) + code;
	}
	return code;
}