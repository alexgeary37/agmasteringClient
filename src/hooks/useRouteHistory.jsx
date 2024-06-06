import { useContext } from "react";
import RouteHistoryContext from "../contexts/RouteHistoryContext";

export const useHistory = () => useContext(RouteHistoryContext);
