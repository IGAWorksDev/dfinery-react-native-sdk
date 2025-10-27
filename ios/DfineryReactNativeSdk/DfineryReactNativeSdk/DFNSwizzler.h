#import <Foundation/Foundation.h>
#import <objc/runtime.h>

@interface DFNSwizzler : NSObject

void dfinery_swizzle(Class dfnClass, SEL dfnSel, Class orgClass, SEL orgSel);

@end
