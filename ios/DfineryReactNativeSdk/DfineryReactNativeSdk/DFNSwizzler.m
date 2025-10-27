#import "DFNSwizzler.h"

@implementation DFNSwizzler

void dfinery_swizzle(Class dfnClass, SEL dfnSel, Class orgClass, SEL orgSel)
{
    Method dfnMethod = class_getInstanceMethod(dfnClass, dfnSel);
    IMP dfnImp = method_getImplementation(dfnMethod);
    const char* dfnMethodType = method_getTypeEncoding(dfnMethod);
    
    BOOL didAddNewMethod = class_addMethod(orgClass, orgSel, dfnImp, dfnMethodType);
    
    if (!didAddNewMethod) {
        class_addMethod(orgClass, dfnSel, dfnImp, dfnMethodType);
        
        dfnMethod = class_getInstanceMethod(orgClass, dfnSel);
        Method orgMethod = class_getInstanceMethod(orgClass, orgSel);
        
        method_exchangeImplementations(dfnMethod, orgMethod);
    }
}
@end

