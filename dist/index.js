"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// register root file untuk menggunakan sourcemap
require("source-map-support/register");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var mongodb_1 = __importDefault(require("mongodb"));
var mongodb_2 = require("./mongodb");
var accounts_1 = require("./accounts");
var transactions_1 = require("./transactions");
function initApp() {
    return __awaiter(this, void 0, void 0, function () {
        var app, connection, db, customerModel, accountModel, transactionModel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = express_1.default();
                    return [4 /*yield*/, mongodb_1.default.connect("" + process.env.MONGODB_URI, { useUnifiedTopology: true })];
                case 1:
                    connection = _a.sent();
                    db = connection.db("" + process.env.MONGODB_NAME);
                    customerModel = new mongodb_2.Customer(db);
                    accountModel = new accounts_1.Account(db);
                    transactionModel = new transactions_1.Transaction(db);
                    //init db mongoose
                    // await mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true })
                    // const customerModel = new Customer()
                    app.use(body_parser_1.default.json());
                    //endPoint transaction
                    app.post('/transaction', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, transactionModel.create(req.body)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_1 = _a.sent();
                                        return [2 /*return*/, next(error_1)];
                                    case 3: return [2 /*return*/, res.send({ success: true })];
                                }
                            });
                        });
                    });
                    app.get('/transaction', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var transactions, error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, transactionModel.getAll()];
                                    case 1:
                                        transactions = _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_2 = _a.sent();
                                        return [2 /*return*/, next(error_2)];
                                    case 3: return [2 /*return*/, res.send(transactions)];
                                }
                            });
                        });
                    });
                    app.get('/transaction/:id', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var transaction, error_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, transactionModel.getByID(req.params.id)];
                                    case 1:
                                        transaction = _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_3 = _a.sent();
                                        return [2 /*return*/, next(error_3)];
                                    case 3: return [2 /*return*/, res.send(transaction)];
                                }
                            });
                        });
                    });
                    app.put('/transaction/:id', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var error_4;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, transactionModel.update(req.params.id, req.body)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_4 = _a.sent();
                                        return [2 /*return*/, next(error_4)];
                                    case 3:
                                        res.send({ success: true });
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    app.delete('/transaction/:id', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var error_5;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, transactionModel.delete(req.params.id)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_5 = _a.sent();
                                        return [2 /*return*/, next(error_5)];
                                    case 3:
                                        res.send({ success: true });
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    //end point accounts
                    app.post('/account', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var error_6;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, accountModel.create(req.body)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_6 = _a.sent();
                                        return [2 /*return*/, next(error_6)];
                                    case 3: return [2 /*return*/, res.send({ success: true })];
                                }
                            });
                        });
                    });
                    app.get('/account', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var accounts, error_7;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, accountModel.getAll()];
                                    case 1:
                                        accounts = _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_7 = _a.sent();
                                        return [2 /*return*/, next(error_7)];
                                    case 3: return [2 /*return*/, res.send(accounts)];
                                }
                            });
                        });
                    });
                    app.get('/account/:id', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var account, error_8;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, accountModel.getByID(req.params.id)];
                                    case 1:
                                        account = _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_8 = _a.sent();
                                        return [2 /*return*/, next(error_8)];
                                    case 3: return [2 /*return*/, res.send(account)];
                                }
                            });
                        });
                    });
                    app.put('/account/:id', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var error_9;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, accountModel.update(req.params.id, req.body)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_9 = _a.sent();
                                        return [2 /*return*/, next(error_9)];
                                    case 3:
                                        res.send({ success: true });
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    app.delete('/account/:id', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var error_10;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, accountModel.delete(req.params.id)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_10 = _a.sent();
                                        return [2 /*return*/, next(error_10)];
                                    case 3:
                                        res.send({ success: true });
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    //end poind customer
                    app.post('/customer', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var error_11;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, customerModel.create(req.body)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_11 = _a.sent();
                                        return [2 /*return*/, next(error_11)];
                                    case 3: return [2 /*return*/, res.send({ success: true })];
                                }
                            });
                        });
                    });
                    app.get('/customer', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var customers, error_12;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, customerModel.getAll()];
                                    case 1:
                                        customers = _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_12 = _a.sent();
                                        return [2 /*return*/, next(error_12)];
                                    case 3: return [2 /*return*/, res.send(customers)];
                                }
                            });
                        });
                    });
                    app.get('/customer/:id', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var customer, error_13;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, customerModel.getByID(req.params.id)];
                                    case 1:
                                        customer = _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_13 = _a.sent();
                                        return [2 /*return*/, next(error_13)];
                                    case 3: return [2 /*return*/, res.send(customer)];
                                }
                            });
                        });
                    });
                    app.put('/customer/:id', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var error_14;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, customerModel.update(req.params.id, req.body)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_14 = _a.sent();
                                        return [2 /*return*/, next(error_14)];
                                    case 3:
                                        res.send({ success: true });
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    app.delete('/customer/:id', function (req, res, next) {
                        return __awaiter(this, void 0, void 0, function () {
                            var error_15;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, customerModel.delete(req.params.id)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        error_15 = _a.sent();
                                        return [2 /*return*/, next(error_15)];
                                    case 3:
                                        res.send({ success: true });
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    app.use(function (err, req, res, next) {
                        res.status(500).send({
                            success: false,
                            message: err.message
                        });
                    });
                    app.listen(process.env.PORT || 8000, function () {
                        console.log("App listen on port " + (process.env.PORT || 8000));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
initApp();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBaUQ7QUFDakQsdUNBQW9DO0FBRXBDLGtEQUEyQjtBQUMzQixnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBRWYsb0RBQTZCO0FBQzdCLDREQUFvQztBQUNwQyxvREFBNkI7QUFFN0IscUNBQWtEO0FBQ2xELHVDQUFrRDtBQUNsRCwrQ0FBOEQ7QUFFOUQsU0FBZSxPQUFPOzs7Ozs7b0JBQ2QsR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQTtvQkFHRixxQkFBTSxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxLQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBYSxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQTs7b0JBQTlGLFVBQVUsR0FBRyxTQUFpRjtvQkFDOUYsRUFBRSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQWMsQ0FBQyxDQUFBO29CQUNqRCxhQUFhLEdBQUcsSUFBSSxrQkFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO29CQUNoQyxZQUFZLEdBQUcsSUFBSSxrQkFBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO29CQUM5QixnQkFBZ0IsR0FBRyxJQUFJLDBCQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7b0JBRTVDLGtCQUFrQjtvQkFDbEIsNEdBQTRHO29CQUM1Ryx1Q0FBdUM7b0JBRXZDLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO29CQUcxQixzQkFBc0I7b0JBRXRCLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFVBQWUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJOzs7Ozs7O3dDQUVsRCxxQkFBTSxnQkFBZ0Is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