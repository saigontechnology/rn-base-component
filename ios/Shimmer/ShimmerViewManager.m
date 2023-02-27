#import "ShimmerViewManager.h"
#import "ShimmerView.h"
#import "FBShimmering.h"

@implementation RCTConvert(FBShimmering)

RCT_ENUM_CONVERTER(FBShimmerDirection, (@{
  @"down": @(FBShimmerDirectionDown),
  @"up": @(FBShimmerDirectionUp),
  @"left": @(FBShimmerDirectionLeft),
  @"right": @(FBShimmerDirectionRight),
}), FBShimmerDirectionRight, integerValue)

RCT_CUSTOM_CONVERTER(CFTimeInterval, CFTimeInterval, [self double:json] / 1000.0)

@end

@implementation ShimmerViewManager

RCT_EXPORT_MODULE(RCTShimmeringView)

- (ShimmerView *)view
{
  return [ShimmerView new];
}

RCT_REMAP_VIEW_PROPERTY(animating, shimmering, BOOL)
RCT_EXPORT_VIEW_PROPERTY(shimmeringDirection, FBShimmerDirection)
RCT_REMAP_VIEW_PROPERTY(duration, shimmeringDuration, CFTimeInterval)
RCT_REMAP_VIEW_PROPERTY(pauseDuration, shimmeringPauseDuration, CFTimeInterval)
RCT_REMAP_VIEW_PROPERTY(animationOpacity, shimmeringAnimationOpacity, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(shimmeringOpacity, CGFloat)
RCT_REMAP_VIEW_PROPERTY(speed, shimmeringSpeed, CGFloat)
RCT_REMAP_VIEW_PROPERTY(highlightLength, shimmeringHighlightLength, CGFloat)
RCT_REMAP_VIEW_PROPERTY(beginFadeDuration, shimmeringBeginFadeDuration, CFTimeInterval)
RCT_REMAP_VIEW_PROPERTY(endFadeDuration, shimmeringEndFadeDuration, CFTimeInterval)

@end
