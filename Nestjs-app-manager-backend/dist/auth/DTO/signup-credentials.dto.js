"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpCredentialsDTO = void 0;
const class_validator_1 = require("class-validator");
class SignUpCredentialsDTO {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(4),
    class_validator_1.MaxLength(20),
    __metadata("design:type", String)
], SignUpCredentialsDTO.prototype, "username", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(20),
    class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Provide a stronger password: at least 1 UPPERCASE letter, at least 1 number, at least 1 lowercase letter' }),
    __metadata("design:type", String)
], SignUpCredentialsDTO.prototype, "password", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(30),
    __metadata("design:type", String)
], SignUpCredentialsDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(4),
    class_validator_1.MaxLength(26),
    class_validator_1.Matches(/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/, { message: 'Provide a name of 4 or more letters, with a space between first, middle and last name.' }),
    __metadata("design:type", String)
], SignUpCredentialsDTO.prototype, "fullname", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(7),
    class_validator_1.MaxLength(15),
    class_validator_1.Matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, { message: 'Provide a valid international phonenumber that start with a "+", followed by a country code and national number.' }),
    __metadata("design:type", String)
], SignUpCredentialsDTO.prototype, "number", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(3),
    __metadata("design:type", String)
], SignUpCredentialsDTO.prototype, "address", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(1),
    __metadata("design:type", String)
], SignUpCredentialsDTO.prototype, "postalcode", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(2),
    __metadata("design:type", String)
], SignUpCredentialsDTO.prototype, "city", void 0);
exports.SignUpCredentialsDTO = SignUpCredentialsDTO;
//# sourceMappingURL=signup-credentials.dto.js.map