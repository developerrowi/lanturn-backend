import { successResponse, errorResponse } from "../helpers";
import RegisterStudents from "../services/RegisterStudents";
import SuspendStudent from "../services/SuspendStudent";
import Notification from "../services/Notif";
import GetCommonStudents from "../services/GetCommonStudents";

export const register = async (req, res) => {
  try {
    const service = new RegisterStudents(req.body);
    await service.call(req.body);
    return successResponse(req, res, {}, 204);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const suspend = async (req, res) => {
  try {
    const service = new SuspendStudent(req.body);
    await service.call(req.body);
    return successResponse(req, res, {}, 204);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const notification = async (req, res) => {
  try {
    const service = new Notification(req.body);
    const data = await service.call(req.body);
    return successResponse(req, res, {Recipients: data}, 200);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getCommonStudents = async (req, res) => {
  try {
    const service = new GetCommonStudents(req.query);
    const data = await service.call(req.query)
    return successResponse(req, res, {Students: data}, 200);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
