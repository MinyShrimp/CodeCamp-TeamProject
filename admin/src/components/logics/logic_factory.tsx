import { LogicHeader } from './header';

export class LogicFactory {
    static createIndex(logicConfig: {
        name: string; //
    }) {
        return () => {
            return (
                <>
                    <LogicHeader entityName={logicConfig.name} />
                    <div></div>
                </>
            );
        };
    }
}
