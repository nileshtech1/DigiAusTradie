import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

// --- Import all your slices ---
import LoginReducer from "../Slice/LoginSlice";
import GetUserDetailsSlice from "../Slice/GetUSerDetailsSlice";
import CreateCustomerSlice from "../Slice/CreateCustomerSlice";
import CreateExpenseSlice from "../Slice/CreateExpenseSlice";
import UpdateUserReducer from "../Slice/UpdateUserSlice";
import ChangePasswordReducer from "../Slice/ChangePasswordSlice";
import ForgetPasswordReducer from "../Slice/ForgetPasswordSlice";
import GetCustomerListReducer from "../Slice/GetCustomerListSlice";
import CreateQuoteReducer from "../Slice/CreateQuoteSlice";
import GetQuotationReducer from "../Slice/GetQuotationSlice";
import EditQuoteReducer from "../Slice/EditQuoteSlice";
import GetTutorialReducer from "../Slice/GetTutorialSlice";
import GetCountryReducer from "../Slice/GetCountrySlice";
import GetStateReducer from "../Slice/GetStateSlice";
import GetTutorialCatReducer from "../Slice/GetTutorialCatSlice";
import GetStockReducer from "../Slice/GetStockSlice";
import SendOrderReducer from "../Slice/SendOrderSlice";
import GetDropdownReducer from "../Slice/GetDropdownSlice";
import EditCustomerReducer from "../Slice/EditCustomerSlice";
import CreateScheduleReducer from "../Slice/CreateScheduleSlice";
import GetScheduleReducer from "../Slice/GetScheduleSlice";
import DeleteScheduleSlice from "../Slice/DeleteScheduleSlice";
import TimeTrackingReducer from "../Slice/TimeTrackingSlice";
import GetTimeTrackerSlice from "../Slice/GetTimeTrackerSlice";
import JobFinishedSlice from "../Slice/JobFinishedSlice";
import GetInvoiceReducer from "../Slice/GetInvoiceSlice";
import GetFinishedJobSlice from "../Slice/GetFinishedJobSlice";
import QuotationStatusSlice from "../Slice/QuotationStatusSlice";
import GetAccountSlice from "../Slice/GetAccountSlice";
import GetItemsSlice from "../Slice/GetItemsSlice";
import GetTrailBalanceSlice from "../Slice/GetTrailBalanceSlice";
import BrandingThemeSlice from "../Slice/BrandingThemeSlice";
import CreateDocumentSlice from "../Slice/CreateDocumentSlice";
import GetDocumentListSlice from "../Slice/GetDocumentListSlice";
import GetJHGroupDocumentSlice from "../Slice/GetJHGroupDocumentSlice";
import InvoiceSentEmailSlice from "../Slice/InvoiceSent&EmailSlice";
import NotificationReducer from "../Slice/NotificationQuoteStatusUpdateSlice";
import ProfitLossSlice from "../Slice/Profit&LossSlice";
import UpdateScheduleSlice from "../Slice/UpdateScheduleSlice";
import XeroQuoteSlice from "../Slice/XeroQuoteSlice";
import GetHazardSlice from "../Slice/GetHazardSlice";
import GetRiskLevelSlice from "../Slice/GetRiskLevelsSlice";
import SignUpSlice from "../Slice/SignUpSlice";
import GetAllUserSlice from "../Slice/GetAllUserSlice";
import GetExpenseSlice from "../Slice/GetExpenseSlice";
import UpdateExpenseSlice from "../Slice/UpdateExpenseSlice";
import DeleteExpenseSlice from "../Slice/DeleteExpenseSlice";
import GetAllScheduleSlice from "../Slice/GetAllScheduleListSlice";
import HelpSupportSlice from "../Slice/HelpSupportSlice";
import favoritesReducer from "../Slice/favoritesSlice";
import readNotificationsSlice from "../Slice/readNotificationsSlice";
import GetTradeTypeSlice from "../Slice/GetTradeTypeSlice";
import AddPaymentSlice from "../Slice/AddPaymentSlice";
import GetPaymentSlice from "../Slice/GetPaymentSlice";
import UpdatePaymentSlice from "../Slice/UpdatePaymentSlice";
import DeletePaymentSlice from "../Slice/DeletePaymentDetailsSlice";
import AddPaymentHistorySlice from "../Slice/AddPaymentHistorySlice";
import GetPaymentHistorySlice from "../Slice/GetPaymentHistorySlice";
import DeleteAccountSlice from "../Slice/DeleteAccountSlice"

// --- Combine all reducers ---
const rootReducer = combineReducers({
  Login: LoginReducer,
  UserDetails: GetUserDetailsSlice,
  CreateCustomer: CreateCustomerSlice,
  CreateExpense: CreateExpenseSlice,
  UserUpdate: UpdateUserReducer,
  ChangePassword: ChangePasswordReducer,
  ForgetPassword: ForgetPasswordReducer,
  CustomerList: GetCustomerListReducer,
  CreateQuote: CreateQuoteReducer,
  QuotationList: GetQuotationReducer,
  EditQuote: EditQuoteReducer,
  TutorialList: GetTutorialReducer,
  CountryList: GetCountryReducer,
  StateList: GetStateReducer,
  TutorialCatList: GetTutorialCatReducer,
  StockList: GetStockReducer,
  SendOrder: SendOrderReducer,
  DropdownList: GetDropdownReducer,
  EditCustomer: EditCustomerReducer,
  CreateSchedule: CreateScheduleReducer,
  ScheduleList: GetScheduleReducer,
  DeleteSchedule: DeleteScheduleSlice,
  TimeTracking: TimeTrackingReducer,
  GetTimeTracking: GetTimeTrackerSlice,
  JobFinished: JobFinishedSlice,
  InvoiceList: GetInvoiceReducer,
  GetFinishedJob: GetFinishedJobSlice,
  QuotationStatus: QuotationStatusSlice,
  AccountCode: GetAccountSlice,
  ItemsJob: GetItemsSlice,
  TrailBalance: GetTrailBalanceSlice,
  BrandingTheme: BrandingThemeSlice,
  Document: CreateDocumentSlice,
  DocumentList: GetDocumentListSlice,
  JHGroupDoc: GetJHGroupDocumentSlice,
  InvoiceSentAndEmail: InvoiceSentEmailSlice,
  Notification: NotificationReducer,
  ProfitLoss: ProfitLossSlice,
  UpdateSchedule: UpdateScheduleSlice,
  XeroQuoteSlice: XeroQuoteSlice,
  GetHazardsSlice: GetHazardSlice,
  RiskLevelsSlice: GetRiskLevelSlice,
  SignUp: SignUpSlice,
  AllUser: GetAllUserSlice,
  ExpenseListSlice: GetExpenseSlice,
  UpdateExpense: UpdateExpenseSlice,
  DeleteExpense: DeleteExpenseSlice,
  AllScheduleList: GetAllScheduleSlice,
  HelpSupport: HelpSupportSlice,
  favorites: favoritesReducer,
  readNotifications: readNotificationsSlice,
  TradeType : GetTradeTypeSlice,
  AddPayment: AddPaymentSlice,
  GetPayment: GetPaymentSlice,
  UpdatePayment: UpdatePaymentSlice,
  DeleteSchedule: DeletePaymentSlice,
  AddPaymentHistory: AddPaymentHistorySlice,
  GetPaymentHistory: GetPaymentHistorySlice,
  DeleteAccount : DeleteAccountSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["Login", "UserDetails", "BrandingTheme", "favorites", "readNotifications"],
  // blacklist: ["QuotationList", "ScheduleList"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
