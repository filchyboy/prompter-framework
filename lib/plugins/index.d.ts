export class PluginManager {
    plugins: any[];
    customTaskTypes: {};
    customTemplates: {};
    use(plugin: any): this;
    getTaskTypes(): {};
    getTemplates(): {};
    hasPlugin(name: any): boolean;
}
export function createPlugin(config: any): {
    name: any;
    taskTypes: any;
    templates: any;
    version: any;
};
