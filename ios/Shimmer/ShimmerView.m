#import "ShimmerView.h"
#import <React/RCTAssert.h>
#import "FBShimmeringLayer.h"

@implementation ShimmerView
{
  CFTimeInterval _shimmeringDuration;
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex
{
  RCTAssert(self.contentView == nil, @"RNShimmeringView may only contain a single subview");
  self.contentView = subview;
}

- (void)removeReactSubview:(UIView *)subview
{
  self.contentView = nil;
  [subview removeFromSuperview];
}

- (NSArray<UIView *> *)reactSubviews
{
  return self.contentView ? @[self.contentView] : @[];
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  [self tryCorrectSpeedFromDuration];
}

- (CFTimeInterval)getShimmeringDuration
{
  return _shimmeringDuration;
}

- (void)setShimmeringDuration:(CFTimeInterval)shimmeringDuration
{
  if (shimmeringDuration < 0) {
    shimmeringDuration = 0;
  }
  if (_shimmeringDuration != shimmeringDuration) {
    _shimmeringDuration = shimmeringDuration;
    [self tryCorrectSpeedFromDuration];
  }
}

- (void)tryCorrectSpeedFromDuration
{
  if (_shimmeringDuration > 0) {
    FBShimmerDirection direction = self.shimmeringDirection;
    FBShimmeringLayer *layer = (FBShimmeringLayer *)self.layer;
    CGRect bounds = layer.contentLayer.bounds;
    
    CGFloat length = (direction == FBShimmerDirectionDown || direction == FBShimmerDirectionUp) ? CGRectGetHeight(bounds) : CGRectGetWidth(bounds);
    
    CGFloat speed = 230;
    if (length > 0) {
      speed = length / _shimmeringDuration;
    }
    
    [self setShimmeringSpeed:speed];
  }
}

@end
