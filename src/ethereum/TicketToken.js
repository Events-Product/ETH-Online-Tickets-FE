import web3 from "./web3";
import abi from "./build/EventPasses.json";
import { config } from "../config/config";

const TicketToken = new web3.eth.Contract(abi, config.contractAddress);

export default TicketToken;
