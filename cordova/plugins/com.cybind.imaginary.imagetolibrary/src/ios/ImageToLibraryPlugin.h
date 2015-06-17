//
//  ImageToLibraryPlugin.h
//  ImgLibrarySave
//
//  Created by Andrew Kovalenko on 06/17/15.
//  Copyright (c) 2015 Cybind. All rights reserved.
//

#import <Cordova/CDV.h>
#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>
#import <UIKit/UIKit.h>
#import <AssetsLibrary/AssetsLibrary.h>

typedef void(^SaveImageCompletion)(NSError* error, NSString* url);

@interface ImageToLibraryPlugin : CDVPlugin
{
    NSString* callbackID; 
}

@property (nonatomic, copy) NSString* callbackID;
@property (strong, atomic) ALAssetsLibrary* library;

// Instance Method  
-(void)saveImage:(CDVInvokedUrlCommand*)command;

-(void)removeImage:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

-(void)saveImageToLibrary: (UIImage *)image;

-(void)saveImage:(UIImage*)image toAlbum:(NSString*)albumName withCompletionBlock:(SaveImageCompletion)completionBlock;

@end