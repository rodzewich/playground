
import {ITest as ITestBase, Test as TestBase} from "../lib/tests";


export interface ITest extends ITestBase {
}


export abstract class Test extends TestBase implements ITest {


    public testTypeOfFunction(callback:() => void):void {

    }

}