/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * Converts property values to and from attribute values.
 */
interface AttributeSerializer<T = any> {
    /**
     * Deserializing function called to convert an attribute value to a property
     * value.
     */
    fromAttribute?(value: string): T;
    /**
     * Serializing function called to convert a property value to an attribute
     * value.
     */
    toAttribute?(value: T): string | null;
}
declare type AttributeType<T = any> = AttributeSerializer<T> | ((value: string) => T);
/**
 * Defines options for a property accessor.
 */
export interface PropertyDeclaration<T = any> {
    /**
     * Indicates how and whether the property becomes an observed attribute.
     * If the value is `false`, the property is not added to `observedAttributes`.
     * If true or absent, the lowercased property name is observed (e.g. `fooBar`
     * becomes `foobar`). If a string, the string value is observed (e.g
     * `attribute: 'foo-bar'`).
     */
    attribute?: boolean | string;
    /**
     * Indicates how to serialize and deserialize the attribute to/from a
     * property. If this value is a function, it is used to deserialize the
     * attribute value a the property value. If it's an object, it can have keys
     * for `fromAttribute` and `toAttribute` where `fromAttribute` is the
     * deserialize function and `toAttribute` is a serialize function used to set
     * the property to an attribute. If no `toAttribute` function is provided and
     * `reflect` is set to `true`, the property value is set directly to the
     * attribute.
     */
    type?: AttributeType<T>;
    /**
     * Indicates if the property should reflect to an attribute.
     * If `true`, when the property is set, the attribute is set using the
     * attribute name determined according to the rules for the `attribute`
     * property option and the value of the property serialized using the rules
     * from the `type` property option.
     */
    reflect?: boolean;
    /**
     * A function that indicates if a property should be considered changed when
     * it is set. The function should take the `newValue` and `oldValue` and
     * return `true` if an update should be requested.
     */
    hasChanged?(value: T, oldValue: T): boolean;
}
/**
 * Map of properties to PropertyDeclaration options. For each property an
 * accessor is made, and the property is processed according to the
 * PropertyDeclaration options.
 */
export interface PropertyDeclarations {
    [key: string]: PropertyDeclaration;
}
export declare type PropertyValues = Map<PropertyKey, unknown>;
export interface HasChanged {
    (value: unknown, old: unknown): boolean;
}
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
export declare const notEqual: HasChanged;
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 */
export declare abstract class UpdatingElement extends HTMLElement {
    /**
     * Maps attribute names to properties; for example `foobar` attribute
     * to `fooBar` property.
     */
    private static _attributeToPropertyMap;
    /**
     * Marks class as having finished creating properties.
     */
    private static _finalized;
    /**
     * Memoized list of all class properties, including any superclass properties.
     */
    private static _classProperties;
    static properties: PropertyDeclarations;
    /**
     * Returns a list of attributes corresponding to the registered properties.
     */
    static readonly observedAttributes: string[];
    /**
     * Creates a property accessor on the element prototype if one does not exist.
     * The property setter calls the property's `hasChanged` property option
     * or uses a strict identity check to determine whether or not to request
     * an update.
     */
    static createProperty(name: PropertyKey, options?: PropertyDeclaration): void;
    /**
     * Creates property accessors for registered properties and ensures
     * any superclasses are also finalized.
     */
    private static _finalize;
    /**
     * Returns the property name for the given attribute `name`.
     */
    private static _attributeNameForProperty;
    /**
     * Returns true if a property should request an update.
     * Called when a property value is set and uses the `hasChanged`
     * option for the property if present or a strict identity check.
     */
    private static _valueHasChanged;
    /**
     * Returns the property value for the given attribute value.
     * Called via the `attributeChangedCallback` and uses the property's `type`
     * or `type.fromAttribute` property option.
     */
    private static _propertyValueFromAttribute;
    /**
     * Returns the attribute value for the given property value. If this
     * returns undefined, the property will *not* be reflected to an attribute.
     * If this returns null, the attribute will be removed, otherwise the
     * attribute will be set to the value.
     * This uses the property's `reflect` and `type.toAttribute` property options.
     */
    private static _propertyValueToAttribute;
    private _updateState;
    private _instanceProperties;
    private _updatePromise;
    /**
     * Map with keys for any properties that have changed since the last
     * update cycle with previous values.
     */
    private _changedProperties;
    /**
     * Map with keys of properties that should be reflected when updated.
     */
    private _reflectingProperties;
    /**
     * Node or ShadowRoot into which element DOM should be rendered. Defaults
     * to an open shadowRoot.
     */
    protected renderRoot?: Element | DocumentFragment;
    constructor();
    /**
     * Performs element initialization. By default this calls `createRenderRoot`
     * to create the element `renderRoot` node and captures any pre-set values for
     * registered properties.
     */
    protected initialize(): void;
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */
    private _saveInstanceProperties;
    /**
     * Applies previously saved instance properties.
     */
    private _applyInstanceProperties;
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     * @returns {Element|DocumentFragment} Returns a node into which to render.
     */
    protected createRenderRoot(): Element | ShadowRoot;
    /**
     * Uses ShadyCSS to keep element DOM updated.
     */
    connectedCallback(): void;
    /**
     * Synchronizes property values when attributes change.
     */
    attributeChangedCallback(name: string, old: string, value: string): void;
    private _propertyToAttribute;
    private _attributeToProperty;
    /**
     * Requests an update which is processed asynchronously. This should
     * be called when an element should update based on some state not triggered
     * by setting a property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored. Returns the `updateComplete` Promise which is resolved
     * when the update completes.
     *
     * @param name {PropertyKey} (optional) name of requesting property
     * @param oldValue {any} (optional) old value of requesting property
     * @returns {Promise} A Promise that is resolved when the update completes.
     */
    requestUpdate(name?: PropertyKey, oldValue?: any): Promise<unknown>;
    /**
     * Requests an update for a specific property and records change information.
     * @param name {PropertyKey} name of requesting property
     * @param oldValue {any} old value of requesting property
     * @param options {PropertyDeclaration}
     */
    private _requestPropertyUpdate;
    /**
     * Invalidates the element causing it to asynchronously update regardless
     * of whether or not any property changes are pending. This method is
     * automatically called when any registered property changes.
     */
    private _invalidate;
    private readonly _hasRequestedUpdate;
    /**
     * Validates the element by updating it.
     */
    private _validate;
    private _markUpdated;
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. This getter can be implemented to
     * await additional state. For example, it is sometimes useful to await a
     * rendered element before fulfilling this Promise. To do this, first await
     * `super.updateComplete` then any subsequent state.
     *
     * @returns {Promise} The Promise returns a boolean that indicates if the
     * update resolved without triggering another update.
     */
    readonly updateComplete: Promise<unknown>;
    /**
     * Controls whether or not `update` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    protected shouldUpdate(_changedProperties: PropertyValues): boolean;
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated DOM in the element's
     * `renderRoot`. Setting properties inside this method will *not* trigger
     * another update.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    protected update(_changedProperties: PropertyValues): void;
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    protected updated(_changedProperties: PropertyValues): void;
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * * @param _changedProperties Map of changed properties with old values
     */
    protected firstUpdated(_changedProperties: PropertyValues): void;
}
export {};
