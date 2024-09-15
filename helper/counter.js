import models from "../model/index.js";
import moment from "moment";
export default class Counter {
  id;
  unique_id;
  data;
  identifier = moment().format("YYMMDD");
  constructor(counter) {
    this.id = counter;
  }

  async init(value = 0) {
    this.data = (await models.Counter.findOne({ _id: this.id })) || { _id: null, value };
    this.data.value = Number(this.data.value) + 1;
    return this.data.value;
  }

  async uniqueId(start, identifier = this.identifier, pad = 5) {
    let count = await this.init();
    this.identifier = identifier;
    this.unique_id = `${start}${identifier}${count.toString().padStart(pad, "0")}`;
    return this.unique_id;
  }
  async increment() {
    return await this.init();
  }

  async save() {
    const result = await models.Counter.findOneAndUpdate(
      { _id: this.id },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    return result;
  }
}
