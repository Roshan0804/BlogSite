import Enquiry from "../models/enquiry.model.js";

export function addEnquiry(body) {
  return new Enquiry(body).save();
}

export function getEnquiry(query) {
  return Enquiry.findOne(query);
}

export function getEnquiries(query) {
  return Enquiry.find(query).sort({ createdAt: -1 });
}

export function deleteEnquiry(query) {
  return Enquiry.findOneAndRemove(query);
}
