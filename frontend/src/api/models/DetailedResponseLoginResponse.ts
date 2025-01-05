/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI doc for template_app
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { DetailedResponseLoginResponseData } from './DetailedResponseLoginResponseData';
import {
    DetailedResponseLoginResponseDataFromJSON,
    DetailedResponseLoginResponseDataFromJSONTyped,
    DetailedResponseLoginResponseDataToJSON,
    DetailedResponseLoginResponseDataToJSONTyped,
} from './DetailedResponseLoginResponseData';

/**
 * 
 * @export
 * @interface DetailedResponseLoginResponse
 */
export interface DetailedResponseLoginResponse {
    /**
     * 
     * @type {DetailedResponseLoginResponseData}
     * @memberof DetailedResponseLoginResponse
     */
    data?: DetailedResponseLoginResponseData;
    /**
     * 
     * @type {string}
     * @memberof DetailedResponseLoginResponse
     */
    message?: string | null;
    /**
     * 
     * @type {string}
     * @memberof DetailedResponseLoginResponse
     */
    nextLink?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof DetailedResponseLoginResponse
     */
    successful: boolean;
}

/**
 * Check if a given object implements the DetailedResponseLoginResponse interface.
 */
export function instanceOfDetailedResponseLoginResponse(value: object): value is DetailedResponseLoginResponse {
    if (!('successful' in value) || value['successful'] === undefined) return false;
    return true;
}

export function DetailedResponseLoginResponseFromJSON(json: any): DetailedResponseLoginResponse {
    return DetailedResponseLoginResponseFromJSONTyped(json, false);
}

export function DetailedResponseLoginResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): DetailedResponseLoginResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'data': json['data'] == null ? undefined : DetailedResponseLoginResponseDataFromJSON(json['data']),
        'message': json['message'] == null ? undefined : json['message'],
        'nextLink': json['next_link'] == null ? undefined : json['next_link'],
        'successful': json['successful'],
    };
}

export function DetailedResponseLoginResponseToJSON(json: any): DetailedResponseLoginResponse {
    return DetailedResponseLoginResponseToJSONTyped(json, false);
}

export function DetailedResponseLoginResponseToJSONTyped(value?: DetailedResponseLoginResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'data': DetailedResponseLoginResponseDataToJSON(value['data']),
        'message': value['message'],
        'next_link': value['nextLink'],
        'successful': value['successful'],
    };
}

